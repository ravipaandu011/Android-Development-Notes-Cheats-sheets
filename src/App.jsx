import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [architecture, setArchitecture] = useState('NewArch'); // 'NewArch' | 'OldBridge'
  const [invocations, setInvocations] = useState(0);
  const [lastLatencyMs, setLastLatencyMs] = useState(0.12);
  const [isProcessing, setIsProcessing] = useState(false);
  const [serializedPayload, setSerializedPayload] = useState('Direct C++ Pointer');

  const isNew = architecture === 'NewArch';

  // 1. Simulate Native Module Call
  const handleExecuteNativeCall = async () => {
    setIsProcessing(true);

    if (isNew) {
      // ⚡ NEW ARCHITECTURE (JSI Direct Memory Invocation)
      // 0ms JSON serialization. Direct C++ pointer invocation.
      await new Promise((res) => setTimeout(res, 50));
      setLastLatencyMs(0.12);
      setSerializedPayload('0 JSON Overhead (Direct C++ Memory Pointer: 0x7ffee1b4)');
    } else {
      // 🐢 OLD BRIDGE ARCHITECTURE
      // Step 1: JSON.stringify in JS ➔ Step 2: Bridge Queue ➔ Step 3: JSON.parse in Native
      await new Promise((res) => setTimeout(res, 450));
      setLastLatencyMs(42.8);
      setSerializedPayload(
        'JSON.stringify({"module":"NativeSensors","method":"getBattery","args":[]}) ➔ Serialized Bridge Queue'
      );
    }

    setInvocations((prev) => prev + 1);
    setIsProcessing(false);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          {/* Header */}
          <View className="mb-4">
            <Text className="text-2xl font-black text-sky-400">JSI &amp; New Arch ⚙️</Text>
            <Text className="text-slate-400 text-xs">
              The JSON Bridge Bottleneck vs. Direct C++ Memory Access (JSI)
            </Text>
          </View>

          {/* 🎛️ Architecture Switcher */}
          <View className="flex-row bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mb-4">
            <Pressable
              onPress={() => {
                setArchitecture('NewArch');
                setLastLatencyMs(0.12);
                setSerializedPayload('Direct C++ Pointer');
              }}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                isNew ? 'bg-sky-500' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-xs font-black uppercase ${
                  isNew ? 'text-slate-950' : 'text-slate-400'
                }`}
              >
                New Architecture ⚡ (JSI)
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setArchitecture('OldBridge');
                setLastLatencyMs(42.8);
                setSerializedPayload('JSON Serialized Bridge Queue');
              }}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                !isNew ? 'bg-amber-500' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-xs font-black uppercase ${
                  !isNew ? 'text-slate-950' : 'text-slate-400'
                }`}
              >
                Old Architecture 🐢 (Bridge)
              </Text>
            </Pressable>
          </View>

          {/* 📊 Real-Time Bridge vs JSI Telemetry */}
          <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-4 shadow-2xl">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-slate-400 text-xs font-bold uppercase">
                Communication Mechanism:
              </Text>
              <View
                className={`px-3 py-1 rounded-full border ${
                  isNew
                    ? 'bg-emerald-500/20 border-emerald-500/40'
                    : 'bg-amber-500/20 border-amber-500/40'
                }`}
              >
                <Text
                  className={`text-xs font-black uppercase ${
                    isNew ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {isNew ? 'Synchronous C++ JSI' : 'Async JSON Serialization'}
                </Text>
              </View>
            </View>

            {/* Latency Gauge */}
            <View className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex-row justify-around items-center mb-3">
              <View className="items-center">
                <Text
                  className={`text-3xl font-black font-mono ${
                    isNew ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {lastLatencyMs} ms
                </Text>
                <Text className="text-slate-400 text-[10px] uppercase font-bold mt-0.5">
                  Invocation Latency
                </Text>
              </View>

              <View className="h-8 w-[1px] bg-slate-800" />

              <View className="items-center">
                <Text className="text-3xl font-black text-white font-mono">
                  {invocations}
                </Text>
                <Text className="text-slate-400 text-[10px] uppercase font-bold mt-0.5">
                  Calls Executed
                </Text>
              </View>
            </View>

            {/* Data Pipeline Inspection */}
            <View className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
              <Text className="text-slate-500 text-[10px] font-bold uppercase mb-1">
                Bridge Transmission Payload:
              </Text>
              <Text
                className={`font-mono text-xs ${
                  isNew ? 'text-sky-400 font-bold' : 'text-amber-300'
                }`}
              >
                {serializedPayload}
              </Text>
            </View>
          </View>

          {/* 💡 Key Architectural Difference Box */}
          <View className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl gap-1.5">
            <Text className="text-white font-bold text-xs">
              {isNew ? '⚡ How JSI Works (New Architecture):' : '🐢 How The Old Bridge Works:'}
            </Text>
            <Text className="text-slate-300 text-xs leading-relaxed">
              {isNew
                ? 'JavaScript holds direct memory references to C++ Host Objects. Calling native code is 100% synchronous and instantaneous—just like calling a regular JavaScript function!'
                : 'JavaScript must convert data to a JSON string, push it to an asynchronous queue, wait for native thread pickup, and parse it back into Java/Obj-C objects. Severe latency for rapid gestures!'}
            </Text>
          </View>
        </View>

        {/* 🎛️ Action Button */}
        <Pressable
          disabled={isProcessing}
          onPress={handleExecuteNativeCall}
          className={`p-4 rounded-2xl items-center justify-center shadow-lg ${
            isNew ? 'bg-sky-500 active:bg-sky-600' : 'bg-amber-500 active:bg-amber-600'
          }`}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#090d16" />
          ) : (
            <Text className="text-slate-950 font-black text-xs uppercase">
              {isNew
                ? 'Call Native Method (Direct C++ JSI Pointer) ⚡'
                : 'Call Native Method (Async JSON Bridge) 🐢'}
            </Text>
          )}
        </Pressable>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
