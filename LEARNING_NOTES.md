# 📚 React Native Complete Master Notes (Live Study Guide)

> This document contains the **exact, word-for-word copy** of all concepts, explanations (English + Telugu), mental models, full code snippets, and quick checks covered during our interactive learning sessions.

---

# 📱 LEVEL 1: React Native Foundations & Hardware Boundaries

---

## 📱 Level 1.1: Core Primitives & Native Mapping

### 1. Mental Model: Web DOM vs. React Native
Web development lo manam `<div>`, `<p>`, `<span>`, `<button>`, `<img>` lanti HTML tags vaadathamu. Browser vatini DOM nodes ga render chesthundi.

React Native lo **DOM undadu**. Instead, React Native components native platform views tho map avthayi:

| Web (HTML) | React Native | Android Native Component | iOS Native Component |
| :--- | :--- | :--- | :--- |
| `<div>`, `<section>` | `<View>` | `android.view.ViewGroup` | `UIView` |
| `<p>`, `<span>`, `<h1>` | `<Text>` | `android.widget.TextView` | `UILabel` |
| `<img>` | `<Image>` | `android.widget.ImageView` | `UIImageView` |
| `<button>` | `<Pressable>` | `android.view.View` (Touch Listener) | `UIControl` / `UIButton` |
| `<input type="text">` | `<TextInput>` | `android.widget.EditText` | `UITextField` |
| Spinner / Loader | `<ActivityIndicator>` | `android.widget.ProgressBar` | `UIActivityIndicatorView` |

---

### 🚨 Golden Rule in React Native:
> **Web lo direct ga `<div>Hello</div>` rayochu, kani React Native lo plain text eppudu `<Text>` tag lopalane undali!**  
> `<View>Hello</View>` ani direct ga rasthe app crash avthundi (*"Text strings must be rendered within a `<Text>` component"*).

---

### 💻 Code Example (ES6 + Tailwind CSS / NativeWind)
```jsx
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const WelcomeCard = () => {
  const userName = "Kiran";

  return (
    // View is like a div container
    <View className="flex-1 justify-center items-center bg-slate-900 p-6">
      
      {/* Card Container */}
      <View className="w-full bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700 items-center">
        
        {/* Text Primitive */}
        <Text className="text-2xl font-bold text-white mb-2">
          Welcome, {userName}! 👋
        </Text>
        
        <Text className="text-slate-400 text-sm text-center mb-4">
          React Native primitives render direct native iOS & Android views.
        </Text>

        {/* Activity Indicator (Native Spinner) */}
        <ActivityIndicator size="small" color="#38bdf8" />
      </View>

    </View>
  );
};

export default WelcomeCard;
```

---

### 🗣️ Telugu + English Explanation:
- **`<View>`**: Idi mana main box/container. Web lo `<div>` elago, ikkada `<View>` alaga. Background color, padding, border ivanni deenike istham.
- **`<Text>`**: Screen meeda em text kanapadalanna (titles, descriptions, numbers), compulsory ga `<Text>` tag lopalane pettali.
- **`<ActivityIndicator>`**: Native loading spinner. Android lo Material spinner vastundi, iOS lo standard Cupertino wheel vastundi automatically!
- **Tailwind Classes**: NativeWind vaadi `bg-slate-900`, `rounded-2xl`, `items-center` lanti familiar classes tho directly native components ni style chesthunnam.

---

### 🛠️ Quick Check:
```jsx
// Is this valid in React Native?
<View>
  {count}
</View>
```
👉 *Answer*: **Invalid! It will crash.** In React Native, numeric and string variables must always be placed inside `<Text>{count}</Text>`.

---
---

## 📱 Level 1.2: Hardware Boundaries (Safe Area & StatusBar)

### 1. The Mobile Problem (Notches & Gesture Bars)
Web lo screen motham flat ga browser window lo untundi. Kani mobile phones lo:
- Top lo **Camera Notch / Punch-hole / Dynamic Island** untundi.
- Bottom lo **Home Gesture Bar / Navigation Buttons** untayi.
- Top lo **Status Bar** (Clock, Battery, Wi-Fi icons) untundi.

Normal `<View>` vaadithey mana text or buttons directly camera notch venaka or battery icon paina overlap aypothayi (content cut aypothundi).

```
┌────────────────────────┐
│  🔋  [ Camera Notch ]  │ <--- Without Safe Area, text goes behind here! ❌
│                        │
│     SAFE AREA ZONE     │ <--- Content should render here ✅
│                        │
│   ───────────────      │ <--- Bottom Home Gesture Pill
└────────────────────────┘
```

---

### 2. The Solution: `react-native-safe-area-context` & `expo-status-bar`
Modern React Native apps lo standard way:
1. **`<SafeAreaProvider>`**: Root wrapper that detects device metrics.
2. **`<SafeAreaView>`**: Automatically top notch and bottom pill ki thagattu safe padding add chesthundi.
3. **`<StatusBar>`**: Status bar icons light (white) ga undala leda dark (black) ga undala ane control isthundi.

---

### 💻 Code Example:
```jsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    // 1. SafeAreaProvider must wrap the app root
    <SafeAreaProvider>
      
      {/* 2. Controls status bar icons (light = white icons for dark theme) */}
      <StatusBar style="light" backgroundColor="#0f172a" />

      {/* 3. SafeAreaView ensures UI stays within screen boundaries */}
      <SafeAreaView className="flex-1 bg-slate-900 px-5">
        
        {/* Header Section */}
        <View className="py-4 border-b border-slate-800">
          <Text className="text-2xl font-extrabold text-sky-400">
            Hardware Boundaries 🛡️
          </Text>
          <Text className="text-slate-400 text-sm mt-1">
            Safe from notches, dynamic islands & home bars.
          </Text>
        </View>

        {/* Main Content Area */}
        <View className="flex-1 justify-center items-center">
          <View className="bg-slate-800 p-6 rounded-3xl border border-slate-700 w-full items-center shadow-xl">
            <Text className="text-white font-semibold text-lg mb-2">
              Safe Area Active ✅
            </Text>
            <Text className="text-slate-300 text-center text-sm leading-relaxed mb-6">
              Notice how the content never clashes with the status bar or the bottom navigation bar.
            </Text>

            {/* Interactive Pressable Button */}
            <Pressable 
              className="bg-sky-500 active:bg-sky-600 px-6 py-3 rounded-xl w-full items-center"
              onPress={() => console.log('Tapped!')}
            >
              <Text className="text-white font-bold text-base">
                Explore Flexbox Next 🚀
              </Text>
            </Pressable>
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`SafeAreaProvider`**: Idi app ki context isthundi (device hardware sizes entha unnayo detect cheyadaniki). App root lo okasari wrap chestham.
- **`SafeAreaView className="flex-1"`**: Idi mana UI ni notch and bottom gesture pill lopalaki push cheyakunda automatic ga safe padding calculate chesi peduthundi.
- **`<StatusBar style="light" />`**: Dark background (`bg-slate-900`) pettinappudu time & battery icons white color (`light`) lo kanipinchela chesthundi.
- **`active:bg-sky-600`**: Tailwind active state vaadi button press chesinappudu visual feedback (ripple/highlight) isthunnam.

---
---

## 📐 Level 1.3: Flexbox in React Native (Web vs Mobile)

### 1. The Big Difference: Web Flexbox vs React Native Flexbox

| Feature | Web CSS Flexbox | React Native Flexbox |
| :--- | :--- | :--- |
| **Default Direction** | `flexDirection: row` (Horizontal) ➡️ | **`flexDirection: column` (Vertical)** ⬇️ |
| **Default Display** | `display: block` (unless specified) | **Prathi `<View>` by default `display: flex`!** |
| **`flex: 1` rule** | Fills space relative to sibling basis | **Parent ki `flex: 1` lekapothe screen expand avvadu** |

> 💡 **Why is default `column` in Mobile?**  
> Mobile phones portrait (vertical) orientation lo untayi. So items top to bottom arrange avvadam standard.

---

### 2. Main Axis vs Cross Axis Rule

```
When flexDirection is 'column' (Default):
⬇️ MAIN AXIS (Vertical)       ---> justifyContent (justify-center, justify-between)
➡️ CROSS AXIS (Horizontal)    ---> alignItems (items-center, items-stretch)

When flexDirection is 'row' (className="flex-row"):
➡️ MAIN AXIS (Horizontal)     ---> justifyContent (justify-center, justify-between)
⬇️ CROSS AXIS (Vertical)       ---> alignItems (items-center, items-stretch)
```

---

### 💻 Code Example: Flexbox Visual Playground
```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3">
        
        {/* Title */}
        <Text className="text-2xl font-bold text-sky-400 mb-1">
          Flexbox Architecture 📐
        </Text>
        <Text className="text-slate-400 text-xs mb-5">
          Mastering Main Axis, Cross Axis & Gap
        </Text>

        {/* SECTION 1: Row Direction with Gap */}
        <View className="mb-6">
          <Text className="text-white font-semibold text-sm mb-2">
            1. Row Layout (`flex-row` + `gap-3`)
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 bg-sky-500/20 border border-sky-500/40 p-4 rounded-xl items-center">
              <Text className="text-sky-400 font-bold">Col 1</Text>
              <Text className="text-slate-400 text-xs">flex-1</Text>
            </View>
            <View className="flex-1 bg-purple-500/20 border border-purple-500/40 p-4 rounded-xl items-center">
              <Text className="text-purple-400 font-bold">Col 2</Text>
              <Text className="text-slate-400 text-xs">flex-1</Text>
            </View>
            <View className="flex-1 bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-xl items-center">
              <Text className="text-emerald-400 font-bold">Col 3</Text>
              <Text className="text-slate-400 text-xs">flex-1</Text>
            </View>
          </View>
        </View>

        {/* SECTION 2: Unequal Proportions (flex-1 vs flex-2) */}
        <View className="mb-6">
          <Text className="text-white font-semibold text-sm mb-2">
            2. Proportions (`flex-1` vs `flex-2`)
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 bg-amber-500/20 border border-amber-500/40 p-4 rounded-xl items-center">
              <Text className="text-amber-400 font-bold">1/3 Space</Text>
              <Text className="text-slate-400 text-xs">flex-1</Text>
            </View>
            <View className="flex-[2] bg-indigo-500/20 border border-indigo-500/40 p-4 rounded-xl items-center">
              <Text className="text-indigo-400 font-bold">2/3 Space</Text>
              <Text className="text-slate-400 text-xs">flex-[2]</Text>
            </View>
          </View>
        </View>

        {/* SECTION 3: Space Between (Justify Content) */}
        <View className="mb-6">
          <Text className="text-white font-semibold text-sm mb-2">
            3. Alignment (`justify-between` + `items-center`)
          </Text>
          <View className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex-row justify-between items-center">
            <View>
              <Text className="text-white font-bold text-base">Order Total</Text>
              <Text className="text-slate-400 text-xs">Inclusive of taxes</Text>
            </View>
            <Text className="text-xl font-extrabold text-emerald-400">
              ₹1,499
            </Text>
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`flex-row`**: React Native lo default `column` kabatti, pakka-pakkana (side-by-side) pettali ante compulsory `flex-row` rayali.
- **`gap-3`**: Previously manam prathi item ki `marginRight` icchevaallam. Ippudu modern React Native & Tailwind lo direct ga parent meeda `gap-3` or `gap-4` isthe automatic ga items madhyalo equal space vasthundi.
- **`flex-1` vs `flex-[2]`**:
  - `Col 1`, `Col 2`, `Col 3` mugguriki `flex-1` isthe screen width ni 3 equal parts (33.3% each) ga share cheskuntayi.
  - Section 2 lo oka box ki `flex-1`, inkoka box ki `flex-[2]` isthe, motham 3 parts lo 1st box ki 1 part (33%), 2nd box ki 2 parts (66%) space vasthundi.
- **`justify-between items-center`**: Main axis lo items ni rendu ends ki tosi (`justify-between`), vertical center (`items-center`) lo align chesthundi (classic checkout / header bar pattern).

---
---

## 📱 Level 1.4: Platform Detection & Touch UX

### 1. Platform Detection (`Platform.OS` & `Platform.select`)
iOS and Android render differently (e.g., iOS uses soft shadows, Android uses Material elevation). Mana code lo platform-specific logic rayadaniki 2 clean approaches unnayi:

```javascript
import { Platform } from 'react-native';

// Approach 1: Conditional check
if (Platform.OS === 'android') {
  console.log("Running on Android device");
}

// Approach 2: Clean object mapping (Platform.select)
const cardShadow = Platform.select({
  ios: 'shadow-lg shadow-sky-500/20',
  android: 'elevation-8',
  default: 'shadow-md',
});
```

---

### 2. Screen Dimensions: `useWindowDimensions()`
Phones different screen sizes lo untayi (e.g., Small phones, Tablets, Foldable devices).
- `useWindowDimensions()` hook automatically live `width` and `height` provides chesthundi. Screen rotate aina live ga update avthundi!

---

### 3. Touch Mastery: Why `<Pressable>` over `<TouchableOpacity>`?
Legacy React Native lo `TouchableOpacity` vaadevaallam. Kani modern React Native lo **`<Pressable>`** is the king:
1. **`android_ripple`**: Android lo native Google Material ripple wave effect vasthundi.
2. **`hitSlop`**: Small buttons (like close ✕ icon) unnapudu, UI size penchakunda touch area ni penchadaniki `hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}` vaadathamu. User button pakkan touch chesina click trigger avthundi!
3. **State-based styling**: `({ pressed }) => ...` tho button nokkinappudu scale down or opacity change cheyocchu.

---

### 💻 Code Example:
```jsx
import React from 'react';
import { View, Text, Pressable, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-4">
        
        {/* Header */}
        <Text className="text-2xl font-black text-sky-400">
          Platform & Touch UX 🎯
        </Text>
        <Text className="text-slate-400 text-xs mb-6">
          Native feedback, hitSlop & dimensions
        </Text>

        {/* 1. Device Info Card */}
        <View className="bg-slate-900 border border-slate-800 p-5 rounded-2xl mb-6">
          <Text className="text-white font-bold text-base mb-3">Device Specs</Text>
          
          <View className="flex-row justify-between py-2 border-b border-slate-800">
            <Text className="text-slate-400 text-sm">Operating System</Text>
            <Text className="text-sky-400 font-bold uppercase">
              {Platform.OS} (v{Platform.Version})
            </Text>
          </View>

          <View className="flex-row justify-between py-2 border-b border-slate-800">
            <Text className="text-slate-400 text-sm">Screen Width</Text>
            <Text className="text-emerald-400 font-bold">{Math.round(width)} px</Text>
          </View>

          <View className="flex-row justify-between py-2">
            <Text className="text-slate-400 text-sm">Screen Height</Text>
            <Text className="text-emerald-400 font-bold">{Math.round(height)} px</Text>
          </View>
        </View>

        {/* 2. Interactive Native Pressable Button */}
        <Text className="text-white font-bold text-base mb-3">
          Interactive Touch Feedback
        </Text>

        <Pressable
          android_ripple={{ color: '#38bdf840', borderless: false }}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          className="bg-sky-500 active:opacity-80 p-4 rounded-xl items-center justify-center mb-4"
          onPress={() => alert(`Running on ${Platform.OS.toUpperCase()}!`)}
        >
          <Text className="text-white font-bold text-base">
            Tap for Native Ripple & Alert 🚀
          </Text>
        </Pressable>

        {/* 3. HitSlop Demo Button (Small Close Icon) */}
        <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center">
          <Text className="text-slate-300 text-sm">
            Try clicking slightly outside the [✕] button:
          </Text>

          <Pressable
            hitSlop={20} // Extends touch area by 20px in all 4 directions!
            className="w-8 h-8 bg-red-500/20 border border-red-500/40 rounded-full items-center justify-center active:bg-red-500/40"
            onPress={() => alert('HitSlop captured your click!')}
          >
            <Text className="text-red-400 font-extrabold text-sm">✕</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`useWindowDimensions()`**: Screen pixel width & height ని instant ga thesukuntundi. Tablet lo unnama, normal phone lo unnama calculate chesi responsive layouts cheyadaniki idi chala helpful.
- **`hitSlop={20}`**: Chala sarlu mobile lo chinnaga unna buttons (like close button `✕` or heart icon) meeda user finger tap chesinappudu miss aypothundi. `hitSlop={20}` pedithe visual ga button chinnagane untundi, kani 20 pixels chuttu touch ni detect chesthundi! User experience smooth ga untundi.
- **`android_ripple={{ color: '#38bdf840' }}`**: Android user button tap chesinappudu native water-ripple wave effect vasthundi.

---
---

# 📋 LEVEL 2: Lists, Forms & Mobile Keyboard Handling

---

## 📋 Level 2.1: Lists & Performance (`ScrollView` vs `FlatList`)

### 1. Mental Model: Why `.map()` in `ScrollView` Breaks Mobile Apps

Web lo manam normal ga `array.map()` vaadi list render chestham. Mobile lo kooda `<ScrollView>` lopalaki `items.map()` rayochu. **Kani idi 50+ items unte mobile lo disaster!**

| Feature | `<ScrollView>` | `<FlatList>` |
| :--- | :--- | :--- |
| **Rendering Strategy** | **Eager Rendering** (All 1,000 items render into memory at once on load) | **Virtualization / Lazy Windowing** (Only visible items on screen are rendered) |
| **RAM / Memory Usage** | High (RAM spikes, app freezes or crashes on low-end phones) | **Constant & Low** (Memory is recycled as you scroll) |
| **Best Used For** | Small, fixed content (Settings page, Forms, static Profile) | **Dynamic, large datasets** (Product feeds, Chat messages, Contacts) |

```
ScrollView (Heavy RAM Spike ❌):
[Item 1] [Item 2] [Item 3] ... [Item 1000] (All rendered in memory simultaneously)

FlatList (Memory Recycling ✅):
   ▲ Unmounted (Freed from RAM)
┌───────────────────────┐
│ [Item 4] (Visible)    │
│ [Item 5] (Visible)    │ <--- ONLY ~5 to 10 items kept in memory!
│ [Item 6] (Visible)    │
└───────────────────────┘
   ▼ Not rendered yet
```

---

### 2. Core `FlatList` Props You Must Master

1. **`data`**: Array of items you want to render (e.g., `products`, `users`).
2. **`renderItem`**: Arrow function that gets called for each item: `({ item, index }) => <YourComponent item={item} />`.
3. **`keyExtractor`**: Unique string ID for each item: `(item) => item.id.toString()`. *(Numbers must be converted to strings!)*
4. **`ItemSeparatorComponent`**: Renders a divider line between items (automatically ignores the top and bottom edges).
5. **`ListEmptyComponent`**: Displayed when `data = []` (no items found state).
6. **`ListHeaderComponent`**: Header component that scrolls naturally along with the list.

---

### 💻 Code Example: High-Performance Notification Feed
```jsx
import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Sample dataset
const INITIAL_NOTIFICATIONS = [
  { id: '1', title: 'Payment Received', desc: '₹2,499 credited from Kiran', time: '2m ago', type: 'success' },
  { id: '2', title: 'Security Alert', desc: 'New login detected on Chrome', time: '15m ago', type: 'warning' },
  { id: '3', title: 'Order Shipped', desc: 'Your package is out for delivery', time: '1h ago', type: 'info' },
  { id: '4', title: 'Subscription Renewed', desc: 'Pro plan renewed for 1 year', time: '3h ago', type: 'success' },
  { id: '5', title: 'Cloud Backup Complete', desc: '2.4 GB synced to drive', time: '5h ago', type: 'info' },
];

const App = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // 1. Single Item Renderer Component
  const renderNotificationItem = ({ item }) => {
    const badgeBg = item.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    item.type === 'warning' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-sky-500/20 text-sky-400 border-sky-500/30';

    return (
      <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-white font-bold text-base">{item.title}</Text>
            <Text className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
              {item.type.toUpperCase()}
            </Text>
          </View>
          <Text className="text-slate-400 text-xs leading-relaxed">{item.desc}</Text>
        </View>
        <Text className="text-slate-500 text-xs font-semibold">{item.time}</Text>
      </View>
    );
  };

  // 2. Custom Separator between items
  const renderSeparator = () => <View className="h-3" />;

  // 3. Header component that scrolls with list
  const renderHeader = () => (
    <View className="pb-4 pt-2">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-2xl font-black text-sky-400">Activity Feed 📋</Text>
        <Pressable 
          onPress={() => setNotifications([])} 
          className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 active:bg-slate-700"
        >
          <Text className="text-red-400 text-xs font-bold">Clear All</Text>
        </Pressable>
      </View>
      <Text className="text-slate-400 text-xs">
        Virtualized FlatList rendering ({notifications.length} items)
      </Text>
    </View>
  );

  // 4. Empty state when list has 0 items
  const renderEmpty = () => (
    <View className="items-center justify-center py-16">
      <Text className="text-4xl mb-3">📭</Text>
      <Text className="text-white font-bold text-lg">No Notifications</Text>
      <Text className="text-slate-400 text-xs mt-1 mb-4">You're all caught up for today!</Text>
      <Pressable 
        onPress={() => setNotifications(INITIAL_NOTIFICATIONS)}
        className="bg-sky-500 px-4 py-2 rounded-xl"
      >
        <Text className="text-white font-bold text-xs">Reload Feed</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-4">
        
        {/* Virtualized FlatList */}
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`FlatList` vs `ScrollView`**: `ScrollView` lo 1000 items unte 1000 items ni okesari phone memory (RAM) loki load chesthundi, deeni valla app lag avthundi or crash avthundi. Kani `FlatList` lo screen meeda kanipinche 5-8 items mathrame memory lo unchi, kinda scroll chesthunte paina unna items ni unmount (recycle) chesthundi!
- **`keyExtractor={(item) => item.id}`**: Prathi item ki unique string key ivvali. React list items re-order aina correct ga track cheyadaniki idi use avthundi.
- **`ItemSeparatorComponent`**: Items madhyalo equal gap or border line pettadaniki idi vaadatharu. Idi first item paina and last item kinda space pettadu, only *madhyalo* mathrame peduthundi.
- **`ListEmptyComponent`**: Array empty (`[]`) ayinappudu automatic ga "No data found / Empty box 📭" state ni render chesthundi without any extra `if-else` condition.

---
---

## 📋 Level 2.2: Pull-to-Refresh & Infinite Scroll (Pagination)

### 1. Mental Model: The Instagram / Twitter Feed Experience
Real-world mobile apps do not load 10,000 items at once from an API. Instead:
1. **Pull-to-Refresh**: Top nundi kindaki drag chesthe (`pull`), latest fresh data kosam fetch chesthundi.
2. **Infinite Scroll (Pagination)**: User list bottom ki reach ayinappudu, automatic ga next page (Page 2, Page 3) load chesi list kindhaki append chesthundi.

```
┌────────────────────────┐
│  🔄 Pull Down Spinner  │ <--- RefreshControl (reloads page 1)
├────────────────────────┤
│ [Post 1]               │
│ [Post 2]               │
│ [Post 3]               │
├────────────────────────┤
│ ⏳ Loading more...     │ <--- ListFooterComponent (onEndReached triggered)
└────────────────────────┘
```

---

### 2. Key Props Breakdown

1. **`<RefreshControl>`**:
   - `refreshing={isRefreshing}`: Boolean state (`true` shows spinner, `false` hides it).
   - `onRefresh={handleRefresh}`: Function to fetch latest data.
   - `colors={['#38bdf8']}`: Spinner color for **Android**.
   - `tintColor="#38bdf8"`: Spinner color for **iOS**.

2. **`onEndReached` & `onEndReachedThreshold`**:
   - `onEndReached={loadMoreData}`: Function triggered when scrolling near bottom.
   - `onEndReachedThreshold={0.5}`: `0.5` ante user list bottom ki inka half-screen dooram unnappude trigger avthundi, so user ki lag kanipinchakunda smooth ga new items render avthayi!
   - `ListFooterComponent`: List చివర్లో (bottom lo) "Loading more items..." spinner or text display cheyadaniki.

---

### 💻 Code Example: Interactive Paginated Feed
```jsx
import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const INITIAL_DATA = [
  { id: '1', title: 'Article #1', category: 'Tech' },
  { id: '2', title: 'Article #2', category: 'Design' },
  { id: '3', title: 'Article #3', category: 'Mobile' },
  { id: '4', title: 'Article #4', category: 'Cloud' },
  { id: '5', title: 'Article #5', category: 'AI' },
  { id: '6', title: 'Article #6', category: 'DevOps' },
];

const App = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 1. Pull-to-Refresh Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(INITIAL_DATA);
      setIsRefreshing(false);
    }, 1500);
  };

  // 2. Infinite Scroll (Load More) Handler
  const handleLoadMore = () => {
    if (isLoadingMore || data.length >= 18) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      const nextId = data.length + 1;
      const newItems = [
        { id: String(nextId), title: `Article #${nextId}`, category: 'Tech' },
        { id: String(nextId + 1), title: `Article #${nextId + 1}`, category: 'AI' },
        { id: String(nextId + 2), title: `Article #${nextId + 2}`, category: 'Mobile' },
      ];
      setData((prevData) => [...prevData, ...newItems]);
      setIsLoadingMore(false);
    }, 1200);
  };

  // 3. Render Single Item
  const renderItem = ({ item }) => (
    <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center">
      <View>
        <Text className="text-white font-bold text-base">{item.title}</Text>
        <Text className="text-slate-400 text-xs mt-0.5">Explore modern mobile architecture</Text>
      </View>
      <View className="bg-sky-500/20 px-3 py-1 rounded-full border border-sky-500/30">
        <Text className="text-sky-400 text-xs font-bold">{item.category}</Text>
      </View>
    </View>
  );

  // 4. Footer Component (Spinner when loading more data)
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View className="py-4 flex-row justify-center items-center gap-2">
        <ActivityIndicator size="small" color="#38bdf8" />
        <Text className="text-slate-400 text-xs font-medium">Loading more articles...</Text>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-4">
        
        {/* Header */}
        <View className="py-3">
          <Text className="text-2xl font-black text-sky-400">Paginated Feed 🔄</Text>
          <Text className="text-slate-400 text-xs">Pull down to refresh • Scroll down to load more</Text>
        </View>

        {/* FlatList with Refresh & Infinite Scroll */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#38bdf8']} // Android spinner color
              tintColor="#38bdf8"   // iOS spinner color
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`RefreshControl`**: User screen top nundi kindaki drag chesinappudu spinner show avthundi. `onRefresh` function lo `isRefreshing = true` chesi API call aipoyaka `false` chestham.
- **Platform Colors**: Android lo `colors={['#38bdf8']}` work avthundi, iOS lo `tintColor="#38bdf8"` work avthundi. Rendu pettadam best practice!
- **`onEndReachedThreshold={0.5}`**: Idi chala important. `0.5` ante user list ending ki 50% screen height distance lo unnappude background lo API call trigger aypothundi. User screen bottom ki vache sariki new items ready ga untayi!
- **`if (isLoadingMore) return;` guard**: User fast ga scroll chesthe duplicate API calls vellakunda guard condition pettam.

---
---

## 📋 Level 2.3: `<SectionList>` & Sticky Headers

### 1. Mental Model: Why `<SectionList>` instead of `<FlatList>`?
FlatList is great for a flat single list. Kani data **categories or groups** lo unnappudu (like **Contacts A-Z**, **Bank Transactions by Date [Today, Yesterday]**, or **Settings Menu**), manaki **`<SectionList>`** kavali.

- **Sticky Section Headers**: List scroll chesthunte, current category title top lo "stick" aypoyi untundi. Next category vachevaraku akkade freeze ayyi untundi (Native WhatsApp / iOS contacts feel!).

```
┌────────────────────────┐
│ 📌 TODAY (Sticky)      │ <--- renderSectionHeader (stays pinned)
├────────────────────────┤
│  🍔 Swiggy - ₹350      │
│  🚕 Uber - ₹180        │
├────────────────────────┤
│ 📌 YESTERDAY           │ <--- Scrolls up and replaces Today
├────────────────────────┤
│  🛒 Supermarket - ₹950 │
└────────────────────────┘
```

---

### 2. The Golden Data Structure Rule
`<SectionList>` lo `sections` prop ki pass chese array format **compulsory** ga ila undali — prathi object lo **`data`** ane array key undali:

```javascript
const TRANSACTION_GROUPS = [
  {
    title: 'Today',
    data: [
      { id: 't1', title: 'Starbucks Coffee', amount: '-₹350' },
      { id: 't2', title: 'Metro Smart Card', amount: '-₹180' },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      { id: 't3', title: 'Salary Bonus', amount: '+₹20,000' },
    ],
  },
];
```

---

### 💻 Code Example: Grouped Expense & Transaction Ledger
```jsx
import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const TRANSACTION_GROUPS = [
  {
    title: 'Today',
    total: '-₹530',
    data: [
      { id: 't1', title: 'Starbucks Coffee', category: 'Food & Drinks', amount: '-₹350', isCredit: false },
      { id: 't2', title: 'Metro Smart Card', category: 'Transport', amount: '-₹180', isCredit: false },
    ],
  },
  {
    title: 'Yesterday',
    total: '+₹18,700',
    data: [
      { id: 't3', title: 'Freelance Design Payout', category: 'Income', amount: '+₹20,000', isCredit: true },
      { id: 't4', title: 'Zomato Dinner', category: 'Food & Drinks', amount: '-₹800', isCredit: false },
      { id: 't5', title: 'Fuel Pump', category: 'Vehicle', amount: '-₹500', isCredit: false },
    ],
  },
  {
    title: '25 Aug 2026',
    total: '-₹2,599',
    data: [
      { id: 't6', title: 'Annual Gym Membership', category: 'Fitness', amount: '-₹2,499', isCredit: false },
    ],
  },
];

const App = () => {
  // 1. Render Row Item
  const renderTransactionItem = ({ item }) => (
    <View className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex-row justify-between items-center mb-3">
      <View>
        <Text className="text-white font-bold text-base">{item.title}</Text>
        <Text className="text-slate-400 text-xs mt-0.5">{item.category}</Text>
      </View>
      <Text className={`font-extrabold text-base ${item.isCredit ? 'text-emerald-400' : 'text-slate-200'}`}>
        {item.amount}
      </Text>
    </View>
  );

  // 2. Render Sticky Section Header
  const renderSectionHeader = ({ section: { title, total } }) => (
    <View className="bg-slate-950/95 py-2.5 flex-row justify-between items-center mb-2">
      <View className="flex-row items-center gap-2">
        <View className="w-2 h-2 rounded-full bg-sky-400" />
        <Text className="text-sky-400 font-extrabold text-sm uppercase tracking-wider">
          {title}
        </Text>
      </View>
      <Text className="text-slate-400 text-xs font-semibold">
        Net: <Text className={total.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'}>{total}</Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-4">
        
        {/* Header Title */}
        <View className="py-3 border-b border-slate-900 mb-2">
          <Text className="text-2xl font-black text-sky-400">Transactions 💳</Text>
          <Text className="text-slate-400 text-xs">Categorized & Sticky Group Headers</Text>
        </View>

        {/* SectionList */}
        <SectionList
          sections={TRANSACTION_GROUPS}
          keyExtractor={(item) => item.id}
          renderItem={renderTransactionItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`SectionList` Data Structure**: `sections` array lo prathi item lo compulsory ga `data: [...]` ane key undali. Migilipoyina properties (like `title`, `total`, `date`) ni `renderSectionHeader` lo access cheskovachu.
- **`stickySectionHeadersEnabled={true}`**: Idi on chesthe headers screen top ki ragane akkada freeze ayyi stick avthayi. Kindaki scroll chesthunna koddi automatic ga next section header replace chesthundi.

---
---

## 📋 Level 2.4: Mobile Keyboard Management & Forms

### 1. The Mobile Problem: The 50% Screen Takeover
Mobile phones lo input field tap chesinappudu, virtual software keyboard open ayyi **screen lo 40% to 50% space ni occupy chesthundi**.

Handling cheyakapothe:
1. Keyboard input box & submit button ni cover chesi hide aypothundi ❌.
2. User screen meeda ekkadaina blank space lo touch chesina keyboard close avvadu ❌.

---

### 2. The 3 Essential Keyboard Tools

| Tool | Purpose |
| :--- | :--- |
| **`<KeyboardAvoidingView>`** | Keyboard open ayinappudu automatically UI ni paiki push chesthundi.<br>`behavior={Platform.OS === 'ios' ? 'padding' : 'height'}` |
| **`Keyboard.dismiss()`** | Blank space meeda touch chesinappudu keyboard ni close/dismiss cheyadaniki. |
| **`keyboardShouldPersistTaps="handled"`** | Keyboard open lo unnappudu "Submit" button okesari tap chesthe click trigger avthundi (double-tap problem ni fix chesthundi). |

---

### 3. Crucial `<TextInput>` Props for Mobile
- `autoCapitalize="none"`: Emails and passwords lo first letter capital avvakunda aputhundi.
- `autoCorrect={false}`: Passwords and emails meeda red underline / autocorrect suggestions raakunda chesthundi.
- `keyboardType="email-address" | "numeric" | "phone-pad"`: Mobile lo correct keyboard layout (with `@` or numbers) ni open chesthundi.
- `secureTextEntry={true}`: Passwords ni dots (`••••••`) ga mask chesthundi.

---

### 💻 Code Example: Robust Mobile Login & Form Validation
```jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // 1. Validation Logic
  const handleLogin = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Keyboard.dismiss();
      alert(`Success! Logging in: ${email}`);
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950">
        
        {/* 1. TouchableWithoutFeedback dismisses keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          
          {/* 2. KeyboardAvoidingView lifts inputs above the software keyboard */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              keyboardShouldPersistTaps="handled"
              className="px-6"
            >
              
              {/* Header */}
              <View className="mb-8">
                <Text className="text-3xl font-black text-sky-400">Welcome Back 👋</Text>
                <Text className="text-slate-400 text-sm mt-1">
                  Enter your credentials to continue
                </Text>
              </View>

              {/* Form Container */}
              <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl gap-4 shadow-2xl">
                
                {/* Email Input */}
                <View>
                  <Text className="text-slate-300 text-xs font-bold uppercase mb-2 tracking-wider">
                    Email Address
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    placeholder="name@example.com"
                    placeholderTextColor="#64748b"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className={`bg-slate-950 text-white px-4 py-3.5 rounded-xl border ${
                      errors.email ? 'border-red-500' : 'border-slate-800'
                    } text-sm font-medium`}
                  />
                  {errors.email && (
                    <Text className="text-red-400 text-xs font-medium mt-1.5 ml-1">
                      ⚠️ {errors.email}
                    </Text>
                  )}
                </View>

                {/* Password Input */}
                <View>
                  <Text className="text-slate-300 text-xs font-bold uppercase mb-2 tracking-wider">
                    Password
                  </Text>
                  <View className="relative justify-center">
                    <TextInput
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                      }}
                      placeholder="••••••••"
                      placeholderTextColor="#64748b"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      className={`bg-slate-950 text-white px-4 py-3.5 pr-16 rounded-xl border ${
                        errors.password ? 'border-red-500' : 'border-slate-800'
                      } text-sm font-medium`}
                    />
                    <Pressable
                      hitSlop={10}
                      onPress={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4"
                    >
                      <Text className="text-sky-400 font-bold text-xs">
                        {showPassword ? 'HIDE' : 'SHOW'}
                      </Text>
                    </Pressable>
                  </View>
                  {errors.password && (
                    <Text className="text-red-400 text-xs font-medium mt-1.5 ml-1">
                      ⚠️ {errors.password}
                    </Text>
                  )}
                </View>

                {/* Submit Button */}
                <Pressable
                  android_ripple={{ color: '#38bdf840' }}
                  onPress={handleLogin}
                  className="bg-sky-500 active:bg-sky-600 p-4 rounded-xl items-center mt-2"
                >
                  <Text className="text-white font-bold text-base">
                    Sign In 🚀
                  </Text>
                </Pressable>

              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`TouchableWithoutFeedback onPress={Keyboard.dismiss}`**: Form lo text boxes kakunda background lo ekkada touch chesina soft keyboard automatic ga close/dismiss aypothundi.
- **`KeyboardAvoidingView behavior={...}`**: iOS lo `behavior="padding"` and Android lo `behavior="height"` pettali. Keyboard open avvagane inputs paiki elevate ayyi screen visibility lo untayi.
- **`keyboardShouldPersistTaps="handled"`**: Keyboard open lo unnappudu user direct ga "Sign In" button tap chesthe keyboard close avvadam tho paatu click event kooda immediate ga trigger avthundi.
- **`autoCapitalize="none"`**: Email or password lo first letter automatic ga capital aypoyi login fail avvakunda aputhundi.

---
---

# 🪝 LEVEL 3: Mobile React Hooks & Component Memory

---

## 🪝 Level 3.1: Mobile Screen Lifecycle & `useEffect` Cleanup

### 1. Mental Model: Why Cleanup Functions are Critical in Mobile
Web browsers lo page refresh chesthe memory clear aypothundi. Kani mobile apps lo **Navigation Stack** untundi — user oka screen nundi vere screen ki vellina, patha screen background memory lo alage undocchu.

If you start a `setInterval`, GPS location tracker, or AppState listener in `useEffect` **without returning a cleanup function**:
- Timer background lo alage run avthu phone **battery ni drain chesthundi**.
- Component screen nundi poyaka kooda state update cheyadaniki try chesi **Memory Leak** create chesthundi!

```
Component Mounts  ──▶  Runs useEffect()  ──▶  Starts Timer / Listener ⏱️
                                                     │
User Navigates Away ──▶ Runs Cleanup return () => {} ──▶ Cancels Timer (Safe! ✅)
```

---

### 2. The 3 Lifecycle Phases of `useEffect`

| Dependency Array | Phase | When it runs |
| :--- | :--- | :--- |
| **`useEffect(() => {}, [])`** | **Mount** | Screen first time open ayinappudu okkasari mathrame run avthundi (API calls, start timers). |
| **`useEffect(() => {}, [count])`** | **Update** | `count` value maarina prathi sari trigger avthundi. |
| **`return () => { clearInterval(id); }`** | **Unmount / Cleanup** | Screen close ayinappudu or component unmount ayinappudu timers/listeners ni destroy chesthundi. |

---

### 💻 Code Example: Live OTP Resend Timer & Session Tracker
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [resendCount, setResendCount] = useState(0);

  // 1. Lifecycle Hook with Mandatory Cleanup Function
  useEffect(() => {
    let timerInterval = null;

    if (isActive && secondsLeft > 0) {
      // Start 1-second interval
      timerInterval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }

    // 🚨 MANDATORY CLEANUP: Clears interval when component unmounts or state changes
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isActive, secondsLeft]); // Re-evaluates when isActive or secondsLeft changes

  // 2. Restart Timer Handler
  const handleResendOtp = () => {
    setSecondsLeft(30);
    setIsActive(true);
    setResendCount((prev) => prev + 1);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-6 justify-center">
        
        {/* Card Container */}
        <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl items-center shadow-2xl">
          
          <View className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-500/30 items-center justify-center mb-4">
            <Text className="text-3xl">🔐</Text>
          </View>

          <Text className="text-2xl font-black text-white mb-1">
            Verification Code
          </Text>
          <Text className="text-slate-400 text-xs text-center mb-6">
            We sent a 6-digit OTP to your registered phone number.
          </Text>

          {/* Dynamic Countdown Display */}
          <View className="bg-slate-950 border border-slate-800 px-6 py-4 rounded-2xl w-full items-center mb-6">
            <Text className="text-slate-400 text-xs font-semibold uppercase mb-1">
              Code Expires In
            </Text>
            <Text className={`text-3xl font-extrabold ${secondsLeft <= 5 ? 'text-red-400' : 'text-sky-400'}`}>
              00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
            </Text>
          </View>

          {/* Action Button */}
          <Pressable
            disabled={isActive}
            onPress={handleResendOtp}
            className={`w-full p-4 rounded-xl items-center ${
              isActive
                ? 'bg-slate-800 opacity-50'
                : 'bg-sky-500 active:bg-sky-600'
            }`}
          >
            <Text className="text-white font-bold text-sm">
              {isActive ? `Wait for timer...` : `Resend OTP Code 🔄`}
            </Text>
          </Pressable>

          {resendCount > 0 && (
            <Text className="text-slate-500 text-xs mt-3">
              Resent {resendCount} {resendCount === 1 ? 'time' : 'times'}
            </Text>
          )}

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`useEffect` Cleanup**: Mobile lo `setInterval` or real-time event listeners pettinappudu, component unmount aythe `return () => clearInterval(timerInterval)` compulsory rayali. Idi rayakapothe user vere screen ki vellipoyina timer background lo alage run ayyi phone battery drain avthundi and memory leak vasthundi.
- **Dependency Array `[isActive, secondsLeft]`**: `secondsLeft` maarina prathi second ki effect re-check cheskuntundi. Once `0` reach avvagane timer ni stop chesthunnam.

---

### 🛠️ Quick Check:
```jsx
useEffect(() => {
  const subscription = Location.watchPositionAsync({}, (loc) => setCoords(loc));

  return () => {
    if (subscription) {
      // For listeners/sensors, use .remove()
      subscription.then((sub) => sub.remove());
    }
  };
}, []);
```
- `clearInterval(id)` ➔ for `setInterval()`.
- `clearTimeout(id)` ➔ for `setTimeout()`.
- `subscription.remove()` ➔ for Event Listeners, Location tracking, Sensors, and AppState.

---
---

## 🪝 Level 3.2: Performance Optimization (`useMemo` vs `useCallback`)

### 1. The Problem: Unnecessary Mobile Re-renders
React Native lo oka component state change ayinappudu (e.g. search bar lo user prathi letter type chesthunnappudu), **aa component function top nundi bottom varaku malli execute avthundi**.

Deeni valla 2 major performance issues vasthayi:
1. **Heavy Calculations**: 1,000 items unna array ni prathi keystroke ki malli filter & sort cheyadam valla UI freeze avthundi (Jank/Lag).
2. **Function Re-creation**: Prathi render lo functions ki kothha memory address (reference) create avthundi. Deeni valla child components & `FlatList` items anavasaram ga re-render avthayi.

---

### 2. The Solution: `useMemo` vs `useCallback`

| Hook | What it Caches / Stores | Mental Rule |
| :--- | :--- | :--- |
| **`useMemo`** | **The RESULT / VALUE** of a calculation | *"Don't recalculate this filtered array unless `query` or `items` change!"* |
| **`useCallback`** | **The FUNCTION REFERENCE** itself | *"Don't create a new function in memory on every render unless `deps` change!"* |

```
useMemo:
[Expensive Calculation] ──▶ Stores Result: [Item A, Item B] ──▶ Returns cached array ✅

useCallback:
const handleDelete = () => {} ──▶ Stores Function Reference in RAM ──▶ Prevents child re-renders ✅
```

---

### 💻 Code Example: High-Speed Product Search Engine
```jsx
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ALL_PRODUCTS = [
  { id: '1', name: 'iPhone 16 Pro Max', category: 'Phones', price: 134999 },
  { id: '2', name: 'MacBook Pro M4', category: 'Laptops', price: 199999 },
  { id: '3', name: 'Sony WH-1000XM5', category: 'Audio', price: 29999 },
  { id: '4', name: 'iPad Air M2', category: 'Tablets', price: 59999 },
  { id: '5', name: 'Apple Watch Ultra 2', category: 'Wearables', price: 89999 },
  { id: '6', name: 'Samsung Galaxy S25 Ultra', category: 'Phones', price: 129999 },
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  // 1. useMemo: Caches the filtered array result
  // Only runs when searchQuery OR selectedCategory changes, NOT when cartCount updates!
  const filteredProducts = useMemo(() => {
    console.log('⚡ Recalculating filtered products...');
    return ALL_PRODUCTS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // 2. useCallback: Caches the function reference
  // Keeps the exact same function memory address across renders!
  const handleAddToCart = useCallback((productName) => {
    setCartCount((prev) => prev + 1);
    alert(`Added to cart: ${productName}`);
  }, []);

  const categories = ['All', 'Phones', 'Laptops', 'Audio', 'Tablets'];

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3">
        
        {/* Header with Cart Counter */}
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-black text-sky-400">Tech Store ⚡</Text>
            <Text className="text-slate-400 text-xs">useMemo & useCallback Powered</Text>
          </View>
          <View className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl flex-row items-center gap-2">
            <Text className="text-base">🛒</Text>
            <Text className="text-emerald-400 font-extrabold text-sm">{cartCount}</Text>
          </View>
        </View>

        {/* Search Input */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          placeholderTextColor="#64748b"
          className="bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl mb-3 text-sm font-medium"
        />

        {/* Category Filter Pills */}
        <View className="flex-row gap-2 mb-4">
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border ${
                selectedCategory === cat
                  ? 'bg-sky-500 border-sky-400'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  selectedCategory === cat ? 'text-white' : 'text-slate-400'
                }`}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Filtered Product List */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => (
            <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center">
              <View className="flex-1 pr-3">
                <Text className="text-white font-bold text-base">{item.name}</Text>
                <Text className="text-sky-400 text-xs mt-0.5 font-semibold">{item.category}</Text>
                <Text className="text-emerald-400 font-extrabold text-sm mt-1">
                  ₹{item.price.toLocaleString('en-IN')}
                </Text>
              </View>

              <Pressable
                onPress={() => handleAddToCart(item.name)}
                className="bg-slate-800 active:bg-sky-500 px-3.5 py-2 rounded-xl border border-slate-700 items-center justify-center"
              >
                <Text className="text-white font-bold text-xs">+ Add</Text>
              </Pressable>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`useMemo`**: User cart button (`+ Add`) nokkinappudu `cartCount` state update avthundi. Normal ga ayithe products list malli filter avvali. Kani `useMemo` valla `searchQuery` or `selectedCategory` maarithe thappa, aa heavy filter function malli run avvadu!
- **`useCallback`**: `handleAddToCart` function memory lo save aypoyi untundi. Parent component re-render aina, prathi item ki kothha function create avvadu. Same function reference share avthundi.

---
---

## 🪝 Level 3.3: The `useRef` Hook (Imperative Access & Silent Memory)

### 1. Mental Model: The 2 Superpowers of `useRef`

| Superpower | What it does | Real-World Mobile Example |
| :--- | :--- | :--- |
| **1. Imperative Component Access** | Directly controls native widgets via `.current` methods. | **Auto-focusing text inputs** (like jumping to next box in a 4-digit OTP) or programmatically scrolling a list. |
| **2. Silent Persistent Memory** | Stores a value that survives re-renders **without triggering a new render**. | Storing `timerId`, previous state values, or tap tracking flags without freezing the UI. |

```
useState:
setCount(5)  ──▶  Triggers Full UI Re-Render 🔄

useRef:
countRef.current = 5  ──▶  Stores value in background SILENTLY (No Re-Render! 🤫)
```

---

### 💻 Code Example: 4-Digit Auto-Advancing OTP Input Grid
```jsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  // 1. Creating 4 imperative references for the 4 input boxes
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3];

  // 2. Auto-Focus Logic when typing
  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // If user entered a digit, automatically focus next input box
    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If user filled all 4 boxes, dismiss keyboard
    if (index === 3 && text.length === 1) {
      Keyboard.dismiss();
    }
  };

  // 3. Handle Backspace (jumping back to previous input)
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
      alert(`Verifying OTP: ${fullOtp} ✅`);
    } else {
      alert('Please enter all 4 digits! ⚠️');
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-6 justify-center">
        
        {/* Card Container */}
        <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl items-center shadow-2xl">
          
          <Text className="text-3xl mb-2">📲</Text>
          <Text className="text-2xl font-black text-white mb-1">Enter OTP Code</Text>
          <Text className="text-slate-400 text-xs text-center mb-8">
            useRef automatically jumps to the next box as you type.
          </Text>

          {/* 4-Digit Input Boxes Grid */}
          <View className="flex-row gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]} // Attaching ref handle
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                className={`w-14 h-16 text-center text-2xl font-black rounded-2xl border ${
                  digit
                    ? 'border-sky-400 bg-sky-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              />
            ))}
          </View>

          {/* Verify Button */}
          <Pressable
            android_ripple={{ color: '#38bdf840' }}
            onPress={handleVerify}
            className="w-full bg-sky-500 active:bg-sky-600 p-4 rounded-xl items-center"
          >
            <Text className="text-white font-bold text-base">Verify Code 🚀</Text>
          </Pressable>

          {/* Reset & Focus 1st box button */}
          <Pressable
            onPress={() => {
              setOtp(['', '', '', '']);
              inputRefs[0].current?.focus(); // Programmatically focus first box!
            }}
            className="mt-4"
          >
            <Text className="text-slate-500 text-xs font-semibold">Clear & Focus 1st Box</Text>
          </Pressable>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`ref={inputRef}` & `.focus()`**: Manam manual ga finger tho prathi box ni touch cheyalsina pani lekunda, `inputRefs[index + 1].current.focus()` vaadi user type cheyagane cursor automatic ga next box loki jump ayyela chesthunnam.
- **Backspace Handling**: `handleKeyPress` lo `e.nativeEvent.key === 'Backspace'` check chesi, current box empty unte cursor ni previous box (`index - 1`) loki jump chesthunnam.
- **Silent Memory**: `useRef` lopalunna value maarina screen malli re-render avvadu, idi native imperative commands (focus, scroll, blur) ki best tool!

---
---

## 🪝 Level 3.4: Custom Mobile Hooks

### 1. Mental Model: Why Custom Hooks in React Native?
Mobile apps lo chala logic repetitive ga untundi (e.g., keyboard open lo unda leda check cheyadam, search bar lo user type chesthunappudu API calls spam avvakunda **debounce** cheyadam, network connectivity check cheyadam).

> **Golden Rule of Custom Hooks:**
> Custom Hook is just a normal JavaScript function whose name starts with **`use`** (like `useDebounce`, `useKeyboardVisible`) and can internally use other React hooks (`useState`, `useEffect`, `useRef`).

---

### 2. Two Essential Production Custom Hooks
1. **`useDebounce(value, delay)`**:
   - User search bar lo type chesthunnappudu prathi letter ki API call vellakunda, typing aapi `500ms` aagaka okka saari mathrame search trigger chesthundi.
2. **`useKeyboardVisible()`**:
   - Phone lo virtual keyboard open lo unda leda live ga detect chesthundi (e.g., keyboard open unte bottom promotional banners or floating buttons ni hide cheyadaniki).

---

### 💻 Code Example: Debounced Search & Keyboard Sensor
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Keyboard, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// ----------------------------------------------------
// 🪝 CUSTOM HOOK 1: useDebounce
// ----------------------------------------------------
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timer to update debounced value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timer if user types again before delay finishes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// ----------------------------------------------------
// 🪝 CUSTOM HOOK 2: useKeyboardVisible
// ----------------------------------------------------
const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Cleanup native event subscriptions
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardVisible;
};

// ----------------------------------------------------
// 📱 MAIN COMPONENT
// ----------------------------------------------------
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Using our 2 Custom Hooks!
  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const isKeyboardOpen = useKeyboardVisible();

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-6 justify-between py-6">
        
        {/* Top Content */}
        <View>
          <Text className="text-2xl font-black text-sky-400 mb-1">
            Custom Hooks 🪝
          </Text>
          <Text className="text-slate-400 text-xs mb-6">
            Reusable logic: useDebounce & useKeyboardVisible
          </Text>

          {/* Search Input Box */}
          <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6">
            <Text className="text-slate-300 text-xs font-bold uppercase mb-2">
              Live Search Input
            </Text>
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Type something fast..."
              placeholderTextColor="#64748b"
              className="bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 text-sm font-medium"
            />
          </View>

          {/* Comparison Cards */}
          <View className="gap-3">
            
            {/* Instant Value */}
            <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <Text className="text-slate-400 text-xs font-semibold">1. Instant State (updates every keystroke):</Text>
              <Text className="text-amber-400 font-bold text-base mt-1">
                "{searchTerm || '...'}"
              </Text>
            </View>

            {/* Debounced Value */}
            <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <Text className="text-slate-400 text-xs font-semibold">2. Debounced Value (waits 600ms):</Text>
              <Text className="text-emerald-400 font-bold text-base mt-1">
                "{debouncedSearchTerm || '...'}"
              </Text>
              <Text className="text-slate-500 text-[11px] mt-1">
                🚀 API call triggers ONLY for this debounced value!
              </Text>
            </View>

            {/* Keyboard Status Sensor */}
            <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center">
              <Text className="text-slate-400 text-xs font-semibold">Software Keyboard:</Text>
              <View className={`px-3 py-1 rounded-full ${isKeyboardOpen ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-slate-800'}`}>
                <Text className={`text-xs font-bold ${isKeyboardOpen ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isKeyboardOpen ? 'OPEN (Typing)' : 'CLOSED (Hidden)'}
                </Text>
              </View>
            </View>

          </View>
        </View>

        {/* Bottom Banner (Automatically hides when keyboard is open!) */}
        {!isKeyboardOpen ? (
          <View className="bg-sky-500/10 border border-sky-500/30 p-4 rounded-2xl items-center">
            <Text className="text-sky-400 font-bold text-xs">
              💡 Floating Action Bar (Visible only when keyboard is closed)
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={Keyboard.dismiss}
            className="bg-slate-800 p-3 rounded-xl items-center"
          >
            <Text className="text-slate-400 text-xs font-bold">Tap to Close Keyboard ✕</Text>
          </Pressable>
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`useDebounce`**: User search bar lo `react native` ani fast ga type chesthe, normal ga 12 API calls vellipothayi (prathi letter ki okati). `useDebounce` vaadithe user type cheyadam aape varaku timer reset avthu untundi, typing complete ayina `600ms` tharvatha okke okka API call velthundi. 90% backend server load thagguthundi!
- **`useKeyboardVisible`**: Mobile keyboard open ayinappudu `Keyboard.addListener` dwara detect chesi `isKeyboardOpen = true` return chesthundi. Bottom lo unde ads, banners or floating bars ni automatically hide chesi screen clean ga unchadaniki idi use avthundi.

---
---

# 🧭 LEVEL 4: Navigation & Screen Lifecycle

---

## 🧭 Level 4.1: Native Stack Navigation & Route Parameters

### 1. Mental Model: Web URLs vs. Mobile Stack Navigation
Web browsers lo manam `/home` nundi `/profile` ki velthe, patha page reload aypoyi new page DOM loki vasthundi.

Kani Mobile lo navigation oka **Deck of Cards** 🃏 lanti **Stack**:
- **Push (`navigate('Details')`)**: Patha screen paina kothha screen card slide ayyi vasthundi. Patha screen background lo active ga untundi (scroll position and state destroy avvavu!).
- **Pop (`goBack()`)**: Top card remove ayyi kindunna patha screen direct ga kanipisthundi.

```
Stack Navigation (LIFO - Last In, First Out):
┌────────────────────────┐
│ 🃏 Product Details     │ <--- Top of Stack (Current Screen)
├────────────────────────┤
│ 🃏 Home Feed Screen    │ <--- Underneath (State & scroll position preserved!)
└────────────────────────┘
```

---

### 2. Passing & Reading Route Parameters
```javascript
// Screen A (Sender):
navigation.navigate('Details', {
  productId: '101',
  productName: 'iPhone 16 Pro',
  price: 134999,
});

// Screen B (Receiver):
const DetailsScreen = ({ route, navigation }) => {
  const { productId, productName, price } = route.params || {};

  return (
    <View>
      <Text>{productName} - ₹{price}</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Go Back ⬅️</Text>
      </Pressable>
    </View>
  );
};
```

---

### 💻 Code Example: Interactive Multi-Screen Stack System
```jsx
import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Sample Catalog Data
const PRODUCTS = [
  { id: '1', name: 'MacBook Pro M4', category: 'Laptops', price: 199999, desc: '16-core GPU, Liquid Retina XDR display.' },
  { id: '2', name: 'Sony WH-1000XM5', category: 'Audio', price: 29999, desc: 'Industry-leading noise cancellation.' },
  { id: '3', name: 'Apple Watch Ultra 2', category: 'Wearables', price: 89999, desc: 'Rugged titanium case, GPS.' },
];

// 📱 SCREEN 1: Home Feed
const HomeScreen = ({ onNavigate }) => {
  return (
    <View className="flex-1 px-5 pt-3">
      <View className="mb-4">
        <Text className="text-2xl font-black text-sky-400">Native Stack 🧭</Text>
        <Text className="text-slate-400 text-xs">Tap an item to push Details Screen</Text>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <Pressable
            android_ripple={{ color: '#38bdf820' }}
            onPress={() => onNavigate('Details', item)}
            className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center"
          >
            <View className="flex-1 pr-3">
              <Text className="text-white font-bold text-base">{item.name}</Text>
              <Text className="text-slate-400 text-xs mt-0.5">{item.category}</Text>
              <Text className="text-emerald-400 font-extrabold text-sm mt-1.5">
                ₹{item.price.toLocaleString('en-IN')}
              </Text>
            </View>
            <View className="bg-sky-500/10 px-3 py-1.5 rounded-xl border border-sky-500/20">
              <Text className="text-sky-400 font-bold text-xs">View ➔</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

// 📱 SCREEN 2: Details Screen
const DetailsScreen = ({ routeParams, onGoBack }) => {
  const { name, category, price, desc, id } = routeParams || {};

  return (
    <View className="flex-1 px-5 pt-3 justify-between pb-6">
      <View>
        <Pressable
          hitSlop={15}
          onPress={onGoBack}
          className="flex-row items-center gap-2 mb-6 self-start bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800"
        >
          <Text className="text-sky-400 font-extrabold text-sm">⬅️ Back to Feed</Text>
        </Pressable>

        <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl gap-3 shadow-2xl">
          <View className="bg-sky-500/20 self-start px-3 py-1 rounded-full border border-sky-500/30">
            <Text className="text-sky-400 text-xs font-bold uppercase">{category}</Text>
          </View>
          <Text className="text-2xl font-black text-white">{name}</Text>
          <Text className="text-3xl font-extrabold text-emerald-400">₹{price?.toLocaleString('en-IN')}</Text>
          <Text className="text-slate-300 text-sm leading-relaxed">{desc}</Text>
        </View>
      </View>

      <Pressable
        android_ripple={{ color: '#ffffff30' }}
        onPress={() => alert(`Purchasing ${name}!`)}
        className="w-full bg-emerald-500 active:bg-emerald-600 p-4 rounded-xl items-center"
      >
        <Text className="text-slate-950 font-black text-base">Buy Now 💳</Text>
      </Pressable>
    </View>
  );
};

// 🚀 ROOT APP (Stack Navigator Engine)
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [routeParams, setRouteParams] = useState(null);

  const navigate = (screenName, params = null) => {
    setRouteParams(params);
    setCurrentScreen(screenName);
  };

  const goBack = () => {
    setRouteParams(null);
    setCurrentScreen('Home');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950">
        {currentScreen === 'Home' ? (
          <HomeScreen onNavigate={navigate} />
        ) : (
          <DetailsScreen routeParams={routeParams} onGoBack={goBack} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **Stack Mechanism**: Home screen nundi item tap cheyagane, `navigate('Details', item)` call ayyi details screen open avthundi. Back button nokkithe `goBack()` call ayyi patha screen loki instantly return avtham.
- **Route Params Flow**: Screen A nundi `item` object ni pass chestham, Screen B lo `routeParams` access chesi data ni render chestham.
- **State Preservation**: Mobile lo stack navigation valla user details screen ki velli back vachina, home screen lo unna scroll position and data reset avvavu.

---
---

## 🧭 Level 4.2 & 4.3: Bottom Tabs, Screen Focus (`useFocusEffect`) & Deep Linking

### 1. Bottom Tab Navigation
Mobile apps lo persistent app-wide navigation kosam **Bottom Tabs** (like Instagram, Swiggy, YouTube) vaadathamu.
- Prathi tab ki **Icon**, **Active Tint Color**, and **Notification Badges** (`tabBarBadge: 4`) untayi.
- Tabs switch chesthunappudu screens background memory lo cached ga untayi (data loss avvadu).

---

### 2. 🚨 The Big Mobile Gotcha: Why useEffect FAILS on Screen Return!
Web lo vere page nundi back vasthe `useEffect` malli run avthundi. **Kani mobile Navigation Stack / Tabs lo Screen unmount avvadu (background lo alage untundi).**

**The Solution**: React Navigation provide chese **`useFocusEffect`** hook screen prathi sari user kanta padinappudu (focus loki vachinappudu) execute avthundi!

```
User leaves Screen A  ──▶ Screen A sleeps in background (Still mounted)
User returns to Screen A ──▶ useEffect() does NOT run ❌
                        ──▶ useFocusEffect() RUNS IMMEDIATELY! ✅ (Refreshes Cart / Wallet)
```

---

### 3. Deep Linking (`myapp://...`)
WhatsApp or SMS lo link click chesinappudu (e.g., `myapp://product/101`), direct ga app open ayyi aa specific screen loki velladaniki **Deep Linking** vaadatharu (Configured in `app.json` via `"scheme": "myapp"`).

---

### 💻 Code Example: Interactive Bottom Tabs & Live Focus Sensor
```jsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// 📱 TAB 1: Home Feed
const HomeTab = ({ visitCount }) => (
  <View className="flex-1 px-5 pt-4">
    <Text className="text-2xl font-black text-sky-400 mb-1">Explore Store 🛍️</Text>
    <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-4 gap-2 shadow-xl">
      <Text className="text-white font-bold text-sm">useFocusEffect Active</Text>
      <Text className="text-slate-400 text-xs">
        Switch between tabs and observe focus counter incrementing!
      </Text>
      <Text className="text-emerald-400 font-extrabold text-sm">Focused: {visitCount} times</Text>
    </View>
  </View>
);

// 🚀 ROOT APP WITH PERSISTENT BOTTOM TAB BAR
const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [homeFocusCount, setHomeFocusCount] = useState(1);
  const [cartCount, setCartCount] = useState(2);

  const handleTabChange = (tabName) => {
    if (tabName === 'Home' && activeTab !== 'Home') {
      setHomeFocusCount((prev) => prev + 1); // Simulating useFocusEffect!
    }
    setActiveTab(tabName);
  };

  const tabs = [
    { id: 'Home', label: 'Feed', icon: '🏠' },
    { id: 'Cart', label: 'Cart', icon: '🛒', badge: cartCount },
    { id: 'Profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 justify-between">
        <View className="flex-1">
          {activeTab === 'Home' && <HomeTab visitCount={homeFocusCount} />}
          {activeTab === 'Cart' && <Text className="text-white p-5">Cart Screen ({cartCount} items)</Text>}
          {activeTab === 'Profile' && <Text className="text-white p-5">Profile Screen (Deep Link)</Text>}
        </View>

        {/* BOTTOM NAVIGATION TAB BAR */}
        <View className="bg-slate-900 border-t border-slate-800/80 px-6 py-3 flex-row justify-around items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                onPress={() => handleTabChange(tab.id)}
                className="items-center relative py-1 px-4"
              >
                {tab.badge > 0 && (
                  <View className="absolute top-0 right-3 bg-red-500 w-4 h-4 rounded-full items-center justify-center z-10">
                    <Text className="text-white text-[9px] font-black">{tab.badge}</Text>
                  </View>
                )}
                <Text className="text-xl mb-0.5">{tab.icon}</Text>
                <Text className={`text-[11px] font-bold ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`useFocusEffect` vs `useEffect`**: User vere tab ki velli malli Home tab ki vachinappudu `useEffect` run avvadu. Kani `useFocusEffect` prathi sari screen focus loki ragane execute avthundi.
- **Tab Badges**: Cart icon paina unde red badge (`tabBarBadge: 2`) user items add/remove chesinappudu live ga update avthundi.
- **Deep Linking**: `myapp://profile` lanti URL scheme unte, outside apps (WhatsApp / Chrome) nundi link click cheyagane mana mobile app direct ga open avthundi.

---
---

# 🌐 LEVEL 5: Networking, API Layer & Authentication

---

## 🌐 Level 5.1: Centralized API Architecture & Axios Interceptors

### 1. Mental Model: Web Fetch vs. Mobile Network Reality
Web apps usually run on stable high-speed broadband. Kani mobile apps lo user **car lo velthunte 5G nundi 4G/2G ki drop avthundi, leda lift/tunnel loki vellinappudu offline aypothundi**.

Prathi component lo direct ga `fetch('https://api.example.com/...')` rayadam mobile apps lo bad practice. Instead, manaki **Centralized API Client with Interceptors** kavali:

```
Outgoing Request:
Component ──▶ [ Request Interceptor ] ──▶ Attaches "Bearer JWT_TOKEN" ──▶ Cloud Server ☁️
                                                                                 │
Incoming Response:                                                               │
Component ◀── [ Response Interceptor ] ◀── Catches 401 & Auto-Logs Out ◀─────────┘
```

---

### 2. Why Axios Interceptors are a Mobile Lifesaver?
1. **Request Interceptor**: Prathi API call ki manual ga header rayalsina pani lekunda, automatic ga storage nundi `JWT Token` theeskuni `headers.Authorization = 'Bearer token'` ga attach chesthundi.
2. **Response Interceptor**: Backend nundi `401 Unauthorized` (Token expired) error vachinappudu, global ga user ni logout chesi Login screen ki redirect chesthundi.
3. **Timeout Handling**: Mobile network slow unte `timeout: 10000` (10 seconds) lo request cancel chesi clean ga *"Slow connection, please retry"* error isthundi.

---

### 💻 Code Example: Production Centralized API Client & User Feed
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// ====================================================
// 🌐 1. CENTRALIZED API SERVICE (Simulated Axios Client)
// ====================================================
const apiClient = {
  get: async (endpoint) => {
    // Request Interceptor: Injects auth token
    const token = "mock_jwt_token_xyz89";
    console.log(`[API REQUEST] 🚀 Calling: ${endpoint} | Auth Token: Bearer ${token}`);

    // Simulating Real Network Delay & Public JSON API
    const response = await fetch(`https://jsonplaceholder.typicode.com${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  },
};

// ====================================================
// 📱 2. MAIN COMPONENT: Live Network Feed
// ====================================================
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Centralized API call
      const data = await apiClient.get('/users');
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Check network.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3">
        
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-black text-sky-400">REST API Layer 🌐</Text>
          <Text className="text-slate-400 text-xs">Centralized Client with Auth Interceptors</Text>
        </View>

        {/* 1. LOADING STATE */}
        {loading ? (
          <View className="flex-1 justify-center items-center gap-3">
            <ActivityIndicator size="large" color="#38bdf8" />
            <Text className="text-slate-400 text-xs font-semibold tracking-wider">
              FETCHING LIVE USERS...
            </Text>
          </View>
        ) : error ? (
          /* 2. ERROR STATE & RETRY BUTTON */
          <View className="flex-1 justify-center items-center px-6">
            <View className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 items-center justify-center mb-3">
              <Text className="text-2xl">⚠️</Text>
            </View>
            <Text className="text-white font-bold text-base mb-1">Network Request Failed</Text>
            <Text className="text-slate-400 text-xs text-center mb-6">{error}</Text>
            <Pressable
              onPress={fetchUsers}
              className="bg-sky-500 active:bg-sky-600 px-6 py-3 rounded-xl items-center w-full"
            >
              <Text className="text-white font-bold text-xs">Try Again 🔄</Text>
            </Pressable>
          </View>
        ) : (
          /* 3. SUCCESS DATA LIST */
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-3" />}
            renderItem={({ item }) => (
              <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center">
                <View className="flex-1 pr-3">
                  <Text className="text-white font-bold text-base">{item.name}</Text>
                  <Text className="text-sky-400 text-xs mt-0.5">@{item.username.toLowerCase()}</Text>
                  <Text className="text-slate-400 text-xs mt-1">📧 {item.email}</Text>
                </View>
                <View className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Text className="text-slate-400 text-[11px] font-mono">{item.address.city}</Text>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **Centralized API Client**: Manam app lo 20 ververu screens nundi API calls cheyalsi vasthe, prathi screen lo `fetch` raasi headers pettadam bad architecture. Okka `apiClient.js` file lo setup chesthe, token headers and error logging anni automatic ga okka chote manage avthayi.
- **Loading & Error States**: Mobile apps lo slow network valla API call `2-3 seconds` theskovachu. User ki blank screen chupinchakunda **`ActivityIndicator`** spinner chupinchali. Request fail ayithe "Try Again" retry button ivvali.

---
---

## 🔐 Level 5.2: Secure Token Storage & Persistent Auth Flow

### 1. Mental Model: Why Plain Storage is Dangerous in Mobile
Web lo developer lu token ni `localStorage` lo save chestharu. Mobile apps lo kooda `AsyncStorage` untundi, **kani sensitive data (JWT tokens, passwords, credit card info) ni plain `AsyncStorage` lo eppudu pettakoodadu!** ❌

| Storage Type | iOS Implementation | Android Implementation | Encryption | Best Used For |
| :--- | :--- | :--- | :--- | :--- |
| **`AsyncStorage`** | Plain text file | SQLite / XML file | ❌ None (Plaintext) | UI Theme, language preference, draft text |
| **`expo-secure-store`** | **iOS Keychain** | **Android Keystore (AES-256)** | ✅ **Hardware Encrypted** | **JWT Auth Tokens, Refresh Tokens, PINs** |

---

### 2. The Conditional Navigation Auth Flow (No Flickers!)
Mobile apps lo standard pattern:
1. App open avvagane hardware SecureStore nundi token check chesthundi (`isLoading = true`).
2. **Token unte** ➔ Direct ga **`<HomeScreen>`** / Dashboard render avthundi.
3. **Token lekapothe** ➔ **`<LoginScreen>`** render avthundi.

```
App Launches 🚀
      │
      ▼
Reads SecureStore 🔑
      │
      ├── [ Token Found ✅ ] ──▶ <HomeScreen /> (Logged In)
      │
      └── [ No Token ❌ ]    ──▶ <LoginScreen /> (Logged Out)
```

---

### 💻 Code Example: Full Persistent Authentication Flow
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Keyboard } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// ====================================================
// 🔐 1. MOCK SECURE STORAGE SERVICE (Simulating expo-secure-store)
// ====================================================
let mockDeviceKeystore = null; // Simulates hardware encrypted storage

const SecureStorage = {
  saveToken: async (token) => {
    mockDeviceKeystore = token;
  },
  getToken: async () => {
    // Simulating slight hardware read delay
    await new Promise((res) => setTimeout(res, 600));
    return mockDeviceKeystore;
  },
  deleteToken: async () => {
    mockDeviceKeystore = null;
  },
};

// ====================================================
// 📱 2. SCREEN A: Login Screen (Auth Stack)
// ====================================================
const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email & password! ⚠️');
      return;
    }

    Keyboard.dismiss();
    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1200));
      const fakeJwtToken = `jwt_token_${Date.now()}`;
      await SecureStorage.saveToken(fakeJwtToken);
      onLoginSuccess(fakeJwtToken);
    } catch (err) {
      alert('Login failed. Check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6">
      <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl gap-4 shadow-2xl">
        <View className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/30 items-center justify-center mb-1">
          <Text className="text-3xl">🔐</Text>
        </View>

        <Text className="text-2xl font-black text-white">Sign In</Text>
        <Text className="text-slate-400 text-xs">Secure Token Storage & Session Persistence</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 text-sm font-medium"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#64748b"
          secureTextEntry
          className="bg-slate-950 text-white p-3.5 rounded-xl border border-slate-800 text-sm font-medium"
        />

        <Pressable
          disabled={isSubmitting}
          onPress={handleLogin}
          className="bg-sky-500 active:bg-sky-600 p-4 rounded-xl items-center mt-2"
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white font-bold text-base">Authorize & Login 🚀</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

// ====================================================
// 📱 3. SCREEN B: Home Dashboard (Authenticated Stack)
// ====================================================
const DashboardScreen = ({ userToken, onLogout }) => {
  return (
    <View className="flex-1 px-6 justify-between py-6">
      <View>
        <Text className="text-2xl font-black text-emerald-400 mb-1">Authenticated ✅</Text>
        <Text className="text-slate-400 text-xs mb-6">Hardware Keystore Session Active</Text>

        <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl gap-3 shadow-xl">
          <Text className="text-white font-bold text-base">Active JWT Session:</Text>
          <View className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <Text className="text-sky-400 font-mono text-xs break-all">{userToken}</Text>
          </View>
          <Text className="text-slate-400 text-xs">
            🔒 This token is stored using hardware-backed AES-256 encryption.
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onLogout}
        className="bg-red-500/20 active:bg-red-500/30 border border-red-500/40 p-4 rounded-xl items-center"
      >
        <Text className="text-red-400 font-bold text-sm">Sign Out & Destroy Token 🚪</Text>
      </Pressable>
    </View>
  );
};

// ====================================================
// 🚀 4. ROOT APP (Persistent Auth Container)
// ====================================================
const App = () => {
  const [token, setToken] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const savedToken = await SecureStorage.getToken();
      if (savedToken) {
        setToken(savedToken);
      }
      setIsInitializing(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    await SecureStorage.deleteToken();
    setToken(null);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950">
        {isInitializing ? (
          <View className="flex-1 justify-center items-center gap-3">
            <ActivityIndicator size="large" color="#38bdf8" />
            <Text className="text-slate-400 text-xs font-bold tracking-widest uppercase">
              Verifying Secure Session...
            </Text>
          </View>
        ) : token ? (
          <DashboardScreen userToken={token} onLogout={handleLogout} />
        ) : (
          <LoginScreen onLoginSuccess={setToken} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`expo-secure-store`**: Phone lo unna `iOS Keychain` & `Android KeyStore` hardware chips tho token ni encrypt chesthundi. Phone rooted or jailbreak ayina token ni evaru donga-lincha-leru (secure!).
- **Splash / Initializing Screen**: App launch avvagane storage nundi token read chese `600ms` time lo `ActivityIndicator` chupistham. Idi Login screen nundi Home screen ki unwanted visual flicker raakunda aputhundi.
- **Conditional Auth Stack**: `token ? <DashboardScreen /> : <LoginScreen />` pettadam valla, user login or logout avvagane automatic ga screen switch aypothundi.

---
---

## 🌐 Level 5.3: Offline Detection & Network Status Banners

### 1. Mental Model: The Offline-First Mobile Standard
Web browsers lo internet pothe browser blank dinosaur 🦖 screen chupisthundi.

Kani real-world mobile apps (like WhatsApp, Uber, Instagram) lo:
1. App **crash avvadu** — UI alage active ga untundi.
2. Top lo smooth ga oka animated banner appear avthundi: *"No Internet Connection ⚠️"*
3. Internet malli connect avvagane banner green ga maaruthundi: *"Back Online ✅"* and 2 seconds lo auto-hide aypothundi.
4. Failed API requests automatic ga retry avthayi!

```
Phone enters Elevator / Tunnel 🚇
         │
         ▼
NetInfo detects: isConnected = false
         │
         ▼
Drops Top Banner: ⚠️ "You are offline. Showing cached data."
         │
Phone exits Tunnel ☀️
         │
         ▼
NetInfo detects: isConnected = true
         │
         ▼
Banner turns: 🟢 "Back Online" (Fades out in 2s)
```

---

### 2. The Custom Hook: `useNetworkStatus()`
```javascript
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('wifi');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
      setConnectionType(state.type); // 'wifi' | 'cellular' | 'none'
    });

    return () => unsubscribe();
  }, []);

  return { isConnected, connectionType };
};
```

---

### 💻 Code Example: Interactive Network Status & Offline Banner Simulator
```jsx
import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const CACHED_POSTS = [
  { id: '1', title: 'React Native 0.81 Released', tag: 'Mobile', time: '10m ago' },
  { id: '2', title: 'Architecture of Offline-First Apps', tag: 'System', time: '1h ago' },
  { id: '3', title: 'Zero Latency with MMKV Storage', tag: 'Performance', time: '3h ago' },
];

const App = () => {
  const [networkState, setNetworkState] = useState('wifi');
  const [showReconnectedBanner, setShowReconnectedBanner] = useState(false);

  const isOnline = networkState !== 'offline';

  const toggleNetwork = (newState) => {
    if (networkState === 'offline' && newState !== 'offline') {
      setShowReconnectedBanner(true);
      setTimeout(() => setShowReconnectedBanner(false), 2500);
    }
    setNetworkState(newState);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950">
        
        {/* 🚨 1. DYNAMIC TOP NETWORK BANNER */}
        {!isOnline ? (
          <View className="bg-amber-500/90 py-2.5 px-4 flex-row items-center justify-center gap-2">
            <Text className="text-slate-950 font-black text-xs">⚠️ No Internet Connection</Text>
            <Text className="text-slate-900 text-xs font-semibold">(Viewing offline cache)</Text>
          </View>
        ) : showReconnectedBanner ? (
          <View className="bg-emerald-500 py-2.5 px-4 flex-row items-center justify-center gap-2">
            <Text className="text-slate-950 font-black text-xs">🟢 Back Online!</Text>
            <Text className="text-slate-950 text-xs font-semibold">Feed synced with cloud.</Text>
          </View>
        ) : null}

        {/* 📱 2. MAIN CONTENT AREA */}
        <View className="flex-1 px-5 pt-4 justify-between pb-6">
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-2xl font-black text-sky-400">Offline Resilience 📡</Text>
                <Text className="text-slate-400 text-xs">NetInfo & Network Status Sensor</Text>
              </View>

              <View className={`px-3 py-1.5 rounded-full border ${
                isOnline ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-red-500/20 border-red-500/30'
              }`}>
                <Text className={`text-xs font-bold uppercase ${
                  isOnline ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {networkState}
                </Text>
              </View>
            </View>

            <Text className="text-white font-bold text-sm mb-3">Recent Feed Articles</Text>
            <FlatList
              data={CACHED_POSTS}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-3" />}
              renderItem={({ item }) => (
                <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center">
                  <View className="flex-1 pr-3">
                    <Text className="text-white font-bold text-sm">{item.title}</Text>
                    <Text className="text-slate-400 text-xs mt-0.5">{item.time}</Text>
                  </View>
                  <View className="bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
                    <Text className="text-sky-400 font-bold text-[10px]">{item.tag}</Text>
                  </View>
                </View>
              )}
            />
          </View>

          {/* 🎛️ 3. SIMULATOR CONTROLS */}
          <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl gap-3 shadow-2xl">
            <Text className="text-slate-300 text-xs font-bold uppercase tracking-wider">
              Simulate Network Conditions:
            </Text>

            <View className="flex-row gap-2">
              <Pressable
                onPress={() => toggleNetwork('wifi')}
                className={`flex-1 p-3 rounded-xl items-center border ${
                  networkState === 'wifi' ? 'bg-sky-500 border-sky-400' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <Text className={`font-bold text-xs ${networkState === 'wifi' ? 'text-white' : 'text-slate-400'}`}>
                  📶 Wi-Fi
                </Text>
              </Pressable>

              <Pressable
                onPress={() => toggleNetwork('cellular')}
                className={`flex-1 p-3 rounded-xl items-center border ${
                  networkState === 'cellular' ? 'bg-sky-500 border-sky-400' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <Text className={`font-bold text-xs ${networkState === 'cellular' ? 'text-white' : 'text-slate-400'}`}>
                  📱 5G Cellular
                </Text>
              </Pressable>

              <Pressable
                onPress={() => toggleNetwork('offline')}
                className={`flex-1 p-3 rounded-xl items-center border ${
                  networkState === 'offline' ? 'bg-amber-500 border-amber-400' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <Text className={`font-bold text-xs ${networkState === 'offline' ? 'text-slate-950' : 'text-slate-400'}`}>
                  ✈️ Offline
                </Text>
              </Pressable>
            </View>
          </View>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`NetInfo` Listener**: Phone background lo network maarina prathi sari event fire avthundi.
- **Offline Banner**: User internet lekapoyina app ni open chesi patha cached posts chuskovachu. Screen top lo *"No Internet"* banner petti, user fresh actions cheyadaniki try chesthe *"Connect to internet to proceed"* ani clean ga prompt chestham.

---
---

# 🐻 LEVEL 6: Global State Management in Mobile (Zustand & Persistent Stores)

---

## 📦 Level 6.1: The Context API Trap in Mobile vs. Zustand Architecture

### 1. Mental Model: Why Context API is a Mobile Performance Trap 🪤

In Web apps, small unnecessary component re-renders might go unnoticed because modern desktop CPUs are fast.  
Kani mobile phones lo, **Context API vaadithe massive UI lag & frame drops vasthayi!**

#### The React Context Problem:
When you wrap your app in a single `<AppContext.Provider value={{ user, cart, theme, notifications }}>`:
- User cart lo oka item add chesinappudu (`cart` state updates)...
- **Aa context ni subscribe chesina PRATHI OKKA COMPONENT (Profile, Settings, Theme, Navbar) unneeded ga malli re-render avthundi!** ❌

#### The Zustand Solution (Atomic Selectors):
Zustand lo manam **Selectors** (`useStore(state => state.cartCount)`) vaadathamu.
- Cart count maarithe... **Cart badge component mathrame re-render avthundi!**
- Profile, Home Feed, and Settings screens memory lo silent ga untayi. 60 FPS buttery smooth! ✅

---

### 2. Context API vs. Zustand Architecture

```
React Context API (Massive Re-render Cascade ❌):
[ AppContext: Cart Updated! ]
         │
         ├──▶ <CartBadge />       (Re-renders ✅)
         ├──▶ <UserProfile />     (Re-renders unnecessarily! ❌)
         ├──▶ <SettingsScreen />  (Re-renders unnecessarily! ❌)
         └──▶ <ProductFeed />     (Re-renders & drops frames! ❌)

Zustand Atomic Selectors (Zero Waste / Exact Targeted Re-render ✅):
[ Zustand Global Store: Cart Updated! ]
         │
         ├──▶ useCartStore(state => state.items)  ──▶ ONLY <CartBadge /> Re-renders! 🎯
         ├──▶ useUserStore(state => state.user)   ──▶ Slept (No re-render! ⚡)
         └──▶ useThemeStore(state => state.theme) ──▶ Slept (No re-render! ⚡)
```

---

### 3. Why Mobile Engineers Prefer Zustand over Redux?

| Feature | Redux Toolkit | React Context | Zustand 🐻 |
| :--- | :--- | :--- | :--- |
| **Boilerplate Code** | High (Actions, Reducers, Dispatchers) | Medium (Providers, Hooks) | **Zero (Just `create()` and use!)** |
| **Root Provider Wrapper** | Required (`<Provider>`) | Required (`<Context.Provider>`) | **Not Needed (Works anywhere!)** |
| **Re-render Optimization** | Good (with selectors) | ❌ Poor (Re-renders whole subtree) | **⚡ Best (Built-in atomic selectors)** |
| **Bundle Size** | ~11 KB | 0 KB (Built into React) | **~1.1 KB (Ultra lightweight!)** |

---

### 💻 Code Example: Interactive Shopping Cart Store with Atomic Selectors

```jsx
import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// ====================================================
// 🐻 1. ZUSTAND-STYLE GLOBAL CART STORE
// ====================================================
let globalStoreState = {
  cart: [
    { id: '1', name: 'AirPods Pro 2', price: 24900, qty: 1 },
  ],
  user: { name: 'Kiran Kumar', tier: 'Prime Gold' },
};

// Global Store Listeners
const listeners = new Set();

const cartStore = {
  getState: () => globalStoreState,
  
  // Action: Add or Increment Item
  addToCart: (product) => {
    const existing = globalStoreState.cart.find((item) => item.id === product.id);
    let updatedCart;
    
    if (existing) {
      updatedCart = globalStoreState.cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...globalStoreState.cart, { ...product, qty: 1 }];
    }

    globalStoreState = { ...globalStoreState, cart: updatedCart };
    listeners.forEach((listener) => listener());
  },

  // Action: Remove Item
  removeFromCart: (productId) => {
    const updatedCart = globalStoreState.cart
      .map((item) => (item.id === productId ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);

    globalStoreState = { ...globalStoreState, cart: updatedCart };
    listeners.forEach((listener) => listener());
  },

  // Action: Clear Cart
  clearCart: () => {
    globalStoreState = { ...globalStoreState, cart: [] };
    listeners.forEach((listener) => listener());
  },
};

// Custom Hook to Subscribe to Store
const useCartStore = (selector) => {
  const [, forceUpdate] = useState({});

  React.useEffect(() => {
    const unsubscribe = () => listeners.delete(forceUpdate);
    listeners.add(() => forceUpdate({}));
    return () => unsubscribe();
  }, []);

  return selector(cartStore.getState());
};

// Catalog Products
const CATALOG = [
  { id: '1', name: 'AirPods Pro 2', price: 24900 },
  { id: '2', name: 'Apple Watch Series 10', price: 46900 },
  { id: '3', name: 'MagSafe Battery Pack', price: 10900 },
];

// ====================================================
// 🛒 2. COMPONENT A: Header Cart Badge (Atomic Selector)
// ====================================================
const HeaderCartBadge = () => {
  // Selects ONLY total items count
  const totalItems = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.qty, 0)
  );

  return (
    <View className="flex-row justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-4">
      <View>
        <Text className="text-white font-extrabold text-lg">Zustand Mobile Store 🐻</Text>
        <Text className="text-slate-400 text-xs">Atomic Global State Management</Text>
      </View>

      <View className="bg-sky-500/20 border border-sky-500/30 px-3.5 py-2 rounded-xl flex-row items-center gap-2">
        <Text className="text-base">🛒</Text>
        <Text className="text-sky-400 font-black text-sm">{totalItems} items</Text>
      </View>
    </View>
  );
};

// ====================================================
// 📱 3. MAIN APP
// ====================================================
const App = () => {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          {/* Header */}
          <HeaderCartBadge />

          {/* Product Catalog */}
          <Text className="text-white font-bold text-sm mb-3">Available Catalog</Text>
          <View className="gap-2.5 mb-6">
            {CATALOG.map((item) => (
              <View
                key={item.id}
                className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex-row justify-between items-center"
              >
                <View>
                  <Text className="text-white font-bold text-sm">{item.name}</Text>
                  <Text className="text-emerald-400 font-extrabold text-xs mt-0.5">
                    ₹{item.price.toLocaleString('en-IN')}
                  </Text>
                </View>

                <Pressable
                  onPress={() => cartStore.addToCart(item)}
                  className="bg-sky-500 active:bg-sky-600 px-4 py-2 rounded-xl"
                >
                  <Text className="text-white font-bold text-xs">+ Add</Text>
                </Pressable>
              </View>
            ))}
          </View>

          {/* Live Cart Breakdown */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white font-bold text-sm">Live Cart Items</Text>
            {cart.length > 0 && (
              <Pressable onPress={() => cartStore.clearCart()} hitSlop={10}>
                <Text className="text-red-400 font-bold text-xs">Clear Cart</Text>
              </Pressable>
            )}
          </View>

          {cart.length === 0 ? (
            <View className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl items-center justify-center">
              <Text className="text-slate-500 text-xs font-semibold">Your cart is currently empty 🛍️</Text>
            </View>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-2" />}
              renderItem={({ item }) => (
                <View className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex-row justify-between items-center">
                  <View className="flex-1 pr-2">
                    <Text className="text-slate-200 font-bold text-xs">{item.name}</Text>
                    <Text className="text-slate-400 text-[11px]">
                      ₹{item.price.toLocaleString('en-IN')} × {item.qty}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Pressable
                      onPress={() => cartStore.removeFromCart(item.id)}
                      className="w-7 h-7 bg-slate-800 rounded-lg items-center justify-center active:bg-red-500/20"
                    >
                      <Text className="text-white font-bold text-xs">-</Text>
                    </Pressable>
                    <Text className="text-sky-400 font-bold text-xs">{item.qty}</Text>
                    <Pressable
                      onPress={() => cartStore.addToCart(item)}
                      className="w-7 h-7 bg-slate-800 rounded-lg items-center justify-center active:bg-emerald-500/20"
                    >
                      <Text className="text-white font-bold text-xs">+</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />
          )}
        </View>

        {/* Checkout Summary Bar */}
        <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row justify-between items-center shadow-2xl">
          <View>
            <Text className="text-slate-400 text-xs">Total Amount:</Text>
            <Text className="text-emerald-400 text-2xl font-black">
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
          </View>
          <Pressable
            disabled={cart.length === 0}
            onPress={() => alert(`Proceeding to checkout with total: ₹${totalPrice.toLocaleString('en-IN')}`)}
            className={`px-6 py-3.5 rounded-xl ${
              cart.length > 0 ? 'bg-emerald-500 active:bg-emerald-600' : 'bg-slate-800 opacity-50'
            }`}
          >
            <Text className="text-slate-950 font-black text-xs">Checkout 💳</Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **Zustand vs Context API**: React Context lo data change ayithe aa Context kinda unna anni components unnecessary ga re-render avthayi. Kani Zustand lo **`useCartStore((state) => state.cart)`** ani exact ga ఏ data kavalano adi mathrame theskuntam. Deeni valla 100 components unna app lo exact ga target component mathrame re-render avthundi (No lag!).
- **No Provider Boilerplate**: Redux or Context API lo app root lo `<Provider>` pettali. Zustand lo **Zero Provider!** Directly ye file lo kavalante aa file lo store import cheskuni state read or modify cheyochu.

---

### 🛠️ Quick Check:
Suppose you have a global Zustand store with `{ user, cart, theme }`.  
If Screen A only subscribes using `const theme = useStore(state => state.theme)`, will Screen A re-render when a user adds an item to the `cart`?  
👉 *Answer*: **No, because the selector only tracks `state.theme`.**

---
---

## 📦 Level 6.2 & 6.3: Zustand Store Architecture, `persist` Middleware & Async Actions

### 1. Mental Model: The `create()` Function

In real-world React Native production apps, we create stores using Zustand's `create()` function:

```javascript
import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  // 1. Initial State
  user: null,
  isLoading: false,
  error: null,

  // 2. Synchronous Action (using set)
  setUser: (userData) => set({ user: userData }),

  // 3. Asynchronous Action (e.g. API Login)
  loginUser: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.login(credentials);
      set({ user: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // 4. Reading Current State inside an Action (using get)
  logout: () => {
    const currentUser = get().user;
    console.log(`Logging out user: ${currentUser?.name}`);
    set({ user: null });
  },
}));
```

---

### 2. Mental Model: Why In-Memory State is Lost on App Kill

When a user closes your app from the recent apps multitasking drawer, the JavaScript engine terminates, and **all in-memory state is wiped clean**.

To make themes, language settings, or cart items **survive app restarts**, Zustand provides the **`persist` middleware**:

```
Zustand State Change ──▶ Automatically writes to AsyncStorage / MMKV 💾
App Cold Restart 🚀  ──▶ Zustand re-hydrates (restores) state before first render!
```

---

### 💻 Code Example: Complete Persistent Theme & Wallet Store

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// ====================================================
// 💾 1. MOCK ASYNC STORAGE ENGINE (Simulates MMKV / AsyncStorage)
// ====================================================
let mockStorageDisk = {
  theme: 'dark',
  walletBalance: 2500,
  transactions: [
    { id: '1', title: 'Salary Bonus', amount: 5000, type: 'credit', time: 'Yesterday' },
    { id: '2', title: 'Swiggy Order', amount: 450, type: 'debit', time: 'Today' },
  ],
};

const StorageEngine = {
  getItem: async (key) => {
    await new Promise((res) => setTimeout(res, 200));
    return mockStorageDisk[key];
  },
  setItem: async (key, value) => {
    mockStorageDisk[key] = value;
  },
};

// ====================================================
// 🐻 2. ZUSTAND GLOBAL PERSISTENT WALLET STORE
// ====================================================
let walletState = {
  theme: 'dark',
  walletBalance: 2500,
  transactions: [
    { id: '1', title: 'Salary Bonus', amount: 5000, type: 'credit', time: 'Yesterday' },
    { id: '2', title: 'Swiggy Order', amount: 450, type: 'debit', time: 'Today' },
  ],
  isProcessing: false,
};

const walletListeners = new Set();

const walletStore = {
  getState: () => walletState,

  // Action 1: Toggle Theme
  toggleTheme: () => {
    const nextTheme = walletState.theme === 'dark' ? 'light' : 'dark';
    walletState = { ...walletState, theme: nextTheme };
    StorageEngine.setItem('theme', nextTheme); // Persist!
    walletListeners.forEach((l) => l());
  },

  // Action 2: Async Wallet Recharge with Optimistic Update
  addFunds: async (amount) => {
    walletState = { ...walletState, isProcessing: true };
    walletListeners.forEach((l) => l());

    // Simulating Bank API Latency
    await new Promise((res) => setTimeout(res, 1200));

    const newTx = {
      id: Date.now().toString(),
      title: 'UPI Wallet Top-up',
      amount: amount,
      type: 'credit',
      time: 'Just now',
    };

    walletState = {
      ...walletState,
      walletBalance: walletState.walletBalance + amount,
      transactions: [newTx, ...walletState.transactions],
      isProcessing: false,
    };

    // Save to Persistent Storage
    StorageEngine.setItem('walletBalance', walletState.walletBalance);
    StorageEngine.setItem('transactions', walletState.transactions);
    walletListeners.forEach((l) => l());
  },

  // Action 3: Transfer Funds (Debit)
  sendPayment: async (recipient, amount) => {
    if (walletState.walletBalance < amount) {
      alert('Insufficient wallet balance! ⚠️');
      return;
    }

    walletState = { ...walletState, isProcessing: true };
    walletListeners.forEach((l) => l());

    await new Promise((res) => setTimeout(res, 1000));

    const newTx = {
      id: Date.now().toString(),
      title: `Sent to ${recipient}`,
      amount: amount,
      type: 'debit',
      time: 'Just now',
    };

    walletState = {
      ...walletState,
      walletBalance: walletState.walletBalance - amount,
      transactions: [newTx, ...walletState.transactions],
      isProcessing: false,
    };

    StorageEngine.setItem('walletBalance', walletState.walletBalance);
    StorageEngine.setItem('transactions', walletState.transactions);
    walletListeners.forEach((l) => l());
  },
};

// Custom Hook to Subscribe
const useWalletStore = (selector) => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = () => walletListeners.delete(forceUpdate);
    walletListeners.add(() => forceUpdate({}));
    return () => unsubscribe();
  }, []);

  return selector(walletStore.getState());
};

// ====================================================
// 📱 3. MAIN COMPONENT
// ====================================================
const App = () => {
  const theme = useWalletStore((state) => state.theme);
  const balance = useWalletStore((state) => state.walletBalance);
  const transactions = useWalletStore((state) => state.transactions);
  const isProcessing = useWalletStore((state) => state.isProcessing);

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const isDark = theme === 'dark';

  const handlePay = () => {
    const numAmount = parseInt(amount, 10);
    if (!recipient.trim() || isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid recipient name & amount! ⚠️');
      return;
    }
    walletStore.sendPayment(recipient, numAmount);
    setRecipient('');
    setAmount('');
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={isDark ? '#090d16' : '#ffffff'}
      />
      <SafeAreaView
        className={`flex-1 px-5 pt-3 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}
      >
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <View>
            <Text
              className={`text-2xl font-black ${
                isDark ? 'text-sky-400' : 'text-sky-600'
              }`}
            >
              Smart Wallet 🐻
            </Text>
            <Text
              className={`text-xs ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Persistent Zustand Store
            </Text>
          </View>

          {/* Theme Toggle Button */}
          <Pressable
            onPress={() => walletStore.toggleTheme()}
            className={`px-3.5 py-2 rounded-xl border ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <Text className="text-xs font-bold">
              {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </Text>
          </Pressable>
        </View>

        {/* 💳 Balance Card */}
        <View
          className={`p-6 rounded-3xl mb-5 shadow-2xl border ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <Text
            className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Total Available Balance
          </Text>
          <Text
            className={`text-3xl font-black mb-4 ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            ₹{balance.toLocaleString('en-IN')}
          </Text>

          {/* Quick Top-up Buttons */}
          <View className="flex-row gap-2">
            <Pressable
              disabled={isProcessing}
              onPress={() => walletStore.addFunds(500)}
              className="flex-1 bg-sky-500 active:bg-sky-600 p-3 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-xs">+ ₹500 Top-up</Text>
            </Pressable>
            <Pressable
              disabled={isProcessing}
              onPress={() => walletStore.addFunds(2000)}
              className="flex-1 bg-indigo-500 active:bg-indigo-600 p-3 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-xs">+ ₹2,000 Top-up</Text>
            </Pressable>
          </View>
        </View>

        {/* 💸 Send Money Form */}
        <View
          className={`p-4 rounded-2xl mb-5 border ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <Text
            className={`text-xs font-bold uppercase mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Quick Transfer
          </Text>
          <View className="flex-row gap-2">
            <TextInput
              value={recipient}
              onChangeText={setRecipient}
              placeholder="Name"
              placeholderTextColor="#64748b"
              className={`flex-1 p-3 rounded-xl border text-xs ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
            />
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="₹ Amount"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              className={`w-28 p-3 rounded-xl border text-xs ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
            />
            <Pressable
              disabled={isProcessing}
              onPress={handlePay}
              className={`p-3 rounded-xl justify-center items-center px-4 ${
                isProcessing ? 'bg-slate-700' : 'bg-emerald-500 active:bg-emerald-600'
              }`}
            >
              <Text className="text-slate-950 font-black text-xs">
                {isProcessing ? '...' : 'Pay'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 📋 Recent Activity */}
        <Text
          className={`text-sm font-bold mb-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Recent Transactions
        </Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              className={`p-3.5 rounded-2xl flex-row justify-between items-center border ${
                isDark
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <View>
                <Text
                  className={`font-bold text-xs ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {item.title}
                </Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">{item.time}</Text>
              </View>
              <Text
                className={`font-black text-xs ${
                  item.type === 'credit'
                    ? 'text-emerald-400'
                    : isDark
                    ? 'text-red-400'
                    : 'text-red-500'
                }`}
              >
                {item.type === 'credit' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
              </Text>
            </View>
          )}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`persist` Middleware**: App close chesina, phone restart chesina mana wallet balance & dark mode theme preference delete avvakunda automatic ga phone storage (`AsyncStorage` / `MMKV`) lo save aypothundi. Next time app open cheyagane instant ga re-hydrate (load) avthundi!
- **Async Global Actions**: `addFunds` or `sendPayment` lanti actions lo `await apiCall()` petti state update chestham. Redux lo lanti `thunk` or `saga` lanti extra libraries emi akkarledu — direct async/await functions Zustand lo work avthayi!

---

### 🛠️ Quick Check:
When building an offline-first app, where should you persist non-sensitive state like `theme` and `cartItems`?  
👉 *Answer*: **Option A) `AsyncStorage` / `react-native-mmkv` with Zustand's `persist` middleware.**

---
---

## ⚡ Level 6.4: Optimistic UI Updates & Global Notification Toasts

### 1. Mental Model: What is an "Optimistic UI Update"?

In traditional web apps:
1. User clicks **"Like"** ❤️ or **"Bookmark"** 🔖.
2. App shows a spinner ⏳ and waits 1.5 seconds for the backend API response.
3. Once the server says `200 OK`, the heart icon turns red. *(This feels slow and clunky on mobile!)*

In top-tier mobile apps (Instagram, Twitter, WhatsApp):
1. **Instantly update the UI on tap** (Heart turns red in 0 milliseconds! ⚡).
2. Send the API request in the background.
3. **If the network request fails**: Automatically rollback the state and show a floating Toast banner: *"Failed to like post. Check connection."*

```
User Taps Like ❤️ ──▶ 1. Instant UI Change (0ms!) ⚡
                             │
                             ├──▶ 2. Background API Call ☁️
                             │          │
                             │          ├── [ Success ✅ ] ──▶ Keep State
                             │          │
                             │          └── [ Failed ❌ ]  ──▶ Rollback to previous state + Show Global Toast!
```

---

### 2. Global Toast Manager with Zustand

Instead of passing toast state into every single screen, we create a global `useToastStore`:
- Any component anywhere can call `useToastStore.getState().showToast('Item deleted!', 'error')`.
- A single `<GlobalToast />` component at the root of the app renders smooth floating animated banners.

---

### 💻 Code Example: Interactive Optimistic Like & Global Toast System

```jsx
import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// ====================================================
// 🍞 1. GLOBAL TOAST MANAGER STORE
// ====================================================
let toastState = {
  visible: false,
  message: '',
  type: 'info', // 'success' | 'error' | 'info'
};

const toastListeners = new Set();

const toastStore = {
  getState: () => toastState,
  showToast: (message, type = 'info', duration = 2500) => {
    toastState = { visible: true, message, type };
    toastListeners.forEach((l) => l());

    setTimeout(() => {
      toastState = { ...toastState, visible: false };
      toastListeners.forEach((l) => l());
    }, duration);
  },
  hideToast: () => {
    toastState = { ...toastState, visible: false };
    toastListeners.forEach((l) => l());
  },
};

const useToastStore = (selector) => {
  const [, forceUpdate] = useState({});
  React.useEffect(() => {
    const unsubscribe = () => toastListeners.delete(forceUpdate);
    toastListeners.add(() => forceUpdate({}));
    return () => unsubscribe();
  }, []);
  return selector(toastStore.getState());
};

// ====================================================
// 📱 2. POSTS STORE (With Optimistic Updates & Rollbacks)
// ====================================================
const INITIAL_POSTS = [
  { id: '1', title: 'Zero Latency with Zustand & NativeWind', author: 'Kiran', likes: 142, isLiked: false },
  { id: '2', title: 'Why FlashList beats FlatList in 2026', author: 'Alex', likes: 89, isLiked: false },
  { id: '3', title: 'Hardware Keystores vs Plain Storage', author: 'Sara', likes: 215, isLiked: true },
];

let feedState = {
  posts: INITIAL_POSTS,
  simulateNetworkFailure: false, // Simulator toggle
};

const feedListeners = new Set();

const feedStore = {
  getState: () => feedState,

  toggleNetworkFailureSimulation: () => {
    feedState = { ...feedState, simulateNetworkFailure: !feedState.simulateNetworkFailure };
    feedListeners.forEach((l) => l());
  },

  // ⚡ Optimistic Toggle Like Action
  toggleLikePost: async (postId) => {
    const post = feedState.posts.find((p) => p.id === postId);
    if (!post) return;

    // Snapshot previous state for rollback
    const previousIsLiked = post.isLiked;
    const previousLikes = post.likes;

    // 1. OPTIMISTIC UPDATE: Update UI instantly (0ms)
    feedState = {
      ...feedState,
      posts: feedState.posts.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      ),
    };
    feedListeners.forEach((l) => l());

    // 2. Background API Call Simulation
    try {
      await new Promise((res) => setTimeout(res, 800));

      if (feedState.simulateNetworkFailure) {
        throw new Error('500 Server Error: Failed to sync like status');
      }

      toastStore.showToast(
        !previousIsLiked ? 'Post Liked! ❤️' : 'Post Unliked 💔',
        'success'
      );
    } catch (err) {
      // 3. ROLLBACK: Revert to previous snapshot if API fails!
      feedState = {
        ...feedState,
        posts: feedState.posts.map((p) =>
          p.id === postId
            ? { ...p, isLiked: previousIsLiked, likes: previousLikes }
            : p
        ),
      };
      feedListeners.forEach((l) => l());

      toastStore.showToast('Network error: Like rolled back! ⚠️', 'error');
    }
  },
};

const useFeedStore = (selector) => {
  const [, forceUpdate] = useState({});
  React.useEffect(() => {
    const unsubscribe = () => feedListeners.delete(forceUpdate);
    feedListeners.add(() => forceUpdate({}));
    return () => unsubscribe();
  }, []);
  return selector(feedStore.getState());
};

// ====================================================
// 🍞 3. FLOATING GLOBAL TOAST COMPONENT
// ====================================================
const GlobalToast = () => {
  const toast = useToastStore((state) => state);

  if (!toast.visible) return null;

  const bgStyle =
    toast.type === 'success'
      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
      : toast.type === 'error'
      ? 'bg-red-500 text-white border-red-400'
      : 'bg-sky-500 text-white border-sky-400';

  return (
    <View className="absolute top-12 left-5 right-5 z-50 shadow-2xl">
      <View className={`py-3 px-4 rounded-2xl flex-row items-center justify-between border ${bgStyle}`}>
        <Text className="font-extrabold text-xs flex-1 pr-2">{toast.message}</Text>
        <Pressable onPress={() => toastStore.hideToast()}>
          <Text className="font-black text-xs">✕</Text>
        </Pressable>
      </View>
    </View>
  );
};

// ====================================================
// 📱 4. MAIN APP
// ====================================================
const App = () => {
  const posts = useFeedStore((state) => state.posts);
  const simulateFailure = useFeedStore((state) => state.simulateNetworkFailure);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        {/* Floating Global Toast Banner */}
        <GlobalToast />

        <View className="flex-1">
          {/* Header */}
          <View className="mb-4">
            <Text className="text-2xl font-black text-sky-400">Optimistic UI ⚡</Text>
            <Text className="text-slate-400 text-xs">Zero-latency feedback with automatic error rollback</Text>
          </View>

          {/* Network Failure Simulator Switch */}
          <Pressable
            onPress={() => feedStore.toggleNetworkFailureSimulation()}
            className={`p-3.5 rounded-2xl mb-4 border flex-row justify-between items-center ${
              simulateFailure
                ? 'bg-red-500/20 border-red-500/40'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <View>
              <Text className="text-white font-bold text-xs">Simulate Bad Network / 500 Error</Text>
              <Text className="text-slate-400 text-[10px]">
                {simulateFailure ? 'Enabled (Likes will fail and rollback)' : 'Disabled (Likes will succeed)'}
              </Text>
            </View>
            <View
              className={`w-5 h-5 rounded-full ${
                simulateFailure ? 'bg-red-500' : 'bg-slate-700'
              }`}
            />
          </Pressable>

          {/* Post Feed */}
          <Text className="text-white font-bold text-sm mb-3">Community Tech Feed</Text>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-3" />}
            renderItem={({ item }) => (
              <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <Text className="text-white font-bold text-sm mb-1">{item.title}</Text>
                <Text className="text-slate-400 text-xs mb-3">Posted by @{item.author.toLowerCase()}</Text>

                <View className="flex-row justify-between items-center border-t border-slate-800/80 pt-3">
                  <Text className="text-slate-400 text-xs font-semibold">
                    {item.likes} {item.likes === 1 ? 'like' : 'likes'}
                  </Text>

                  <Pressable
                    onPress={() => feedStore.toggleLikePost(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl flex-row items-center gap-1.5 border ${
                      item.isLiked
                        ? 'bg-red-500/20 border-red-500/40'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <Text className="text-sm">{item.isLiked ? '❤️' : '🤍'}</Text>
                    <Text
                      className={`text-xs font-bold ${
                        item.isLiked ? 'text-red-400' : 'text-slate-400'
                      }`}
                    >
                      {item.isLiked ? 'Liked' : 'Like'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **Optimistic UI Pattern**: User heart icon tap cheyagane 1.5 seconds wait cheyakunda `0 milliseconds` lo heart ni red chestham (`isLiked: true`). User experience super fast ga untundi.
- **Rollback Mechanism**: Background lo API call fail ayithe (e.g. 500 server error or network drop), patha state snapshot (`previousIsLiked`, `previousLikes`) theskuni state ni malli revert (rollback) chesi, top lo global floating Toast chupistham.

---

### 🛠️ Quick Check:
In an Optimistic UI update, if the backend server returns an error, what must the client app do?  
👉 *Answer*: **Option B) Rollback the state to the previous snapshot and show an error notification to the user.**

---
---

# 🪄 LEVEL 7: Gestures & Micro-Animations (Reanimated 3 & Gesture Handler)

---

## ⚡ Level 7.1 & 7.2: The UI Thread vs. JS Thread & Reanimated 3 Core Primitives

### 1. Mental Model: Why Legacy `Animated` Stutters vs. Reanimated 3 🏎️

In React Native, your app runs on **two separate execution threads**:

```
┌─────────────────────────────────────────────────────────────┐
│ 🐢 1. JavaScript Thread (Single-Threaded)                   │
│   • Runs React Component Renders                            │
│   • Fetches APIs & Parses JSON                              │
│   • Executes Zustand State Updates & Business Logic         │
│   🚨 IF JS IS BUSY ──▶ Animations DROP FRAMES (Lag / Janky) │
└─────────────────────────────────────────────────────────────┘
                             │
            🌉 The Bridge / JSI Interface
                             │
┌─────────────────────────────────────────────────────────────┐
│ 🚀 2. Native UI Thread (Runs at 60 FPS - 120 FPS)           │
│   • Renders Native Views (iOS UIKit / Android Views)        │
│   • Handles Finger Touches & Screen Refresh                 │
│   ⚡ Reanimated 3 runs 100% on this UI Thread via "Worklets"│
└─────────────────────────────────────────────────────────────┘
```

#### What is a "Worklet"?
A **Worklet** is a tiny JavaScript function that gets compiled and executed **directly inside the Native UI Thread**.  
Even if your JavaScript thread is frozen parsing a 10 MB JSON payload, **your Reanimated animations will glide at 120 FPS without a single frame drop!** 🏎️💨

---

### 2. The 4 Essential Reanimated 3 Primitives

| Primitive | What it does | Mental Model |
| :--- | :--- | :--- |
| **`useSharedValue(initial)`** | Stores a mutable variable directly in UI Thread memory. | Like `useRef`, but UI thread reads it instantly without re-rendering the JS component. |
| **`useAnimatedStyle(() => {})`** | Maps shared values to dynamic styles (transform, opacity, scale). | Runs as a worklet on the UI thread whenever the shared value changes. |
| **`withTiming(toValue, config)`** | Animates a value linearly or with easing curves over a fixed duration (e.g., 300ms). | Best for color transitions, opacities, and progress bars. |
| **`withSpring(toValue, config)`** | Animates a value using real-world **physics** (mass, damping, stiffness). | Best for natural bounces, button presses, swipe cards, and toggles! |

---

### 3. Easing (`withTiming`) vs. Physics (`withSpring`)

```
withTiming(1, { duration: 300 }):
Start ────────────────────── Linear / Eased ──────────────────────▶ End (Fixed Time)

withSpring(1, { damping: 12, stiffness: 90 }):
Start ──────────────────────▶ Over-shoots ──▶ Bounces ──▶ Settles at End (Natural Physics! 🎾)
```

---

### 💻 Code Example: Interactive Spring Micro-Interactions & Pulsing Radar

```jsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// ====================================================
// 🪄 1. SIMULATED REANIMATED SPRING ENGINE
// (Demonstrating UI Thread Shared Value & Spring Mechanics)
// ====================================================
const App = () => {
  // State 1: Interactive Physics Button Scale (Spring)
  const [buttonPressed, setButtonPressed] = useState(false);

  // State 2: Smooth Toggle Switch (0 = Left, 1 = Right)
  const [toggleActive, setToggleActive] = useState(false);

  // State 3: Card Expand / Collapse
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-black text-sky-400">Reanimated 3 🪄</Text>
            <Text className="text-slate-400 text-xs">
              UI-Thread Micro-Animations & Spring Physics (120 FPS)
            </Text>
          </View>

          {/* 🌟 1. SPRING PHYSICS BOUNCY BUTTON */}
          <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-4 shadow-xl">
            <Text className="text-white font-bold text-sm mb-1">
              1. Physics Button Press (`withSpring`)
            </Text>
            <Text className="text-slate-400 text-xs mb-4">
              Scales down on press and bounces back naturally using spring damping.
            </Text>

            <Pressable
              onPressIn={() => setButtonPressed(true)}
              onPressOut={() => setButtonPressed(false)}
              className={`p-4 rounded-2xl items-center transition-all ${
                buttonPressed
                  ? 'bg-sky-600 scale-95 shadow-sm'
                  : 'bg-sky-500 scale-100 shadow-lg'
              }`}
            >
              <Text className="text-white font-black text-base">
                {buttonPressed ? 'Compacted 🎾' : 'Press to Bounce 🚀'}
              </Text>
            </Pressable>
          </View>

          {/* 🔘 2. NATIVE TOGGLE SWITCH */}
          <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-4 flex-row justify-between items-center shadow-xl">
            <View className="flex-1 pr-4">
              <Text className="text-white font-bold text-sm">2. Spring Toggle Switch</Text>
              <Text className="text-slate-400 text-xs mt-0.5">
                Translates knob on the UI thread with spring physics
              </Text>
            </View>

            <Pressable
              onPress={() => setToggleActive((prev) => !prev)}
              className={`w-16 h-9 rounded-full p-1 transition-colors ${
                toggleActive ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <View
                className={`w-7 h-7 rounded-full bg-white shadow-md transition-transform ${
                  toggleActive ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </Pressable>
          </View>

          {/* 📦 3. ACCORDION EXPAND / COLLAPSE */}
          <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
            <Pressable
              onPress={() => setIsExpanded((prev) => !prev)}
              className="flex-row justify-between items-center"
            >
              <View>
                <Text className="text-white font-bold text-sm">3. Accordion Transition</Text>
                <Text className="text-slate-400 text-xs mt-0.5">
                  Tap to trigger layout height animation
                </Text>
              </View>
              <Text className="text-sky-400 font-extrabold text-base">
                {isExpanded ? '▲ Hide' : '▼ Expand'}
              </Text>
            </Pressable>

            {isExpanded && (
              <View className="mt-4 pt-4 border-t border-slate-800/80 gap-2">
                <Text className="text-slate-300 text-xs leading-relaxed">
                  ⚡ <strong>useSharedValue:</strong> Stores variables in UI Thread memory.
                </Text>
                <Text className="text-slate-300 text-xs leading-relaxed">
                  🎨 <strong>useAnimatedStyle:</strong> Runs as a worklet without triggering JS component re-renders.
                </Text>
                <Text className="text-slate-300 text-xs leading-relaxed">
                  🎯 <strong>60-120 FPS:</strong> Zero bridge overhead ensures buttery smooth performance.
                </Text>
              </View>
            )}
          </View>

        </View>

        {/* Radar Live Status Indicator */}
        <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5">
            <View className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <Text className="text-slate-300 text-xs font-semibold">
              UI Thread Worklet Engine Active
            </Text>
          </View>
          <Text className="text-emerald-400 font-black text-xs">120 FPS ⚡</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **JS Thread vs UI Thread**: Normal React Native lo JavaScript thread API calls & calculations tho busy ga unte animations lag avthayi. Kani **Reanimated 3** lo animations direct ga phone యొక్క **Native UI Thread** meeda run avthayi. JS thread hang ayina kooda animations super smooth ga 60 to 120 FPS speed tho glide avthayi!
- **`useSharedValue`**: Idi component state (`useState`) lanti normal variable kadu. Idi UI thread memory lo store ayye dynamic value. Idi change ayinappudu component motham re-render avvadu, kevalam visual animated style mathrame update avthundi.
- **`withSpring`**: Physics math tho pani chesthundi (bouncy ball bounce ayinattu). Natural button presses and swipe gestures ki idi best!

---

### 🛠️ Quick Check:
Why is `useSharedValue` preferred over React's standard `useState` when animating a draggable card?  
👉 *Answer*: **Option A) Because `useState` re-renders the entire component tree on every single pixel movement on the JS thread, while `useSharedValue` updates only the UI thread style smoothly.**

---
---

## 👆 Level 7.3 & 7.4: Pan Gestures, Interpolation & Swipe-to-Dismiss

### 1. Mental Model: The Gesture Lifecycle on the UI Thread

`react-native-gesture-handler` provides direct native-level touch recognition. We chain methods to create a gesture:

```javascript
const panGesture = Gesture.Pan()
  // 1. When finger touches the screen
  .onBegin(() => {
    console.log('Touch started');
  })
  // 2. As finger moves (runs 120 times/sec on the UI thread)
  .onUpdate((event) => {
    translateX.value = event.translationX;
  })
  // 3. When finger lifts off the screen
  .onEnd((event) => {
    if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
      // Swiped far enough -> Dismiss off-screen!
      translateX.value = withTiming(500);
    } else {
      // Not far enough -> Snap back to center with spring!
      translateX.value = withSpring(0);
    }
  });
```

---

### 2. Mental Model: What is Interpolation?

**Interpolation** maps an input range (like how many pixels you dragged a card) into an output range (like opacity, rotation, or scale):

```
Drag Distance (translateX) : [ -200px ────── 0px ────── +200px ]
                                │            │            │
Mapped Opacity (opacity)   : [   0.0  ────── 1.0 ──────   0.0  ]
Mapped Rotation (deg)      : [ -15deg ────── 0deg ───── +15deg ]
```

```javascript
const animatedCardStyle = useAnimatedStyle(() => {
  const opacity = interpolate(
    translateX.value,
    [-150, 0, 150], // Input: Dragging left or right
    [0.3, 1, 0.3],  // Output: Fades out as you drag away
    Extrapolation.CLAMP
  );

  const rotate = `${interpolate(translateX.value, [-200, 200], [-12, 12])}deg`;

  return {
    transform: [{ translateX: translateX.value }, { rotate }],
    opacity,
  };
});
```

---

### 💻 Code Example: Interactive Swipe-to-Dismiss Task Card System

```jsx
import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Initial Tasks
const INITIAL_TASKS = [
  { id: '1', title: 'Review Reanimated 3 Worklets PR', priority: 'High', color: 'border-red-500/40 bg-red-500/10 text-red-400' },
  { id: '2', title: 'Configure MMKV Offline Storage', priority: 'Medium', color: 'border-amber-500/40 bg-amber-500/10 text-amber-400' },
  { id: '3', title: 'Test Native Stack Transitions on iOS', priority: 'Low', color: 'border-sky-500/40 bg-sky-500/10 text-sky-400' },
  { id: '4', title: 'Optimize FlatList Recycling Window', priority: 'High', color: 'border-red-500/40 bg-red-500/10 text-red-400' },
];

const App = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [swipedItem, setSwipedItem] = useState(null);

  // Swipe Action Handler
  const handleDeleteTask = (id) => {
    setSwipedItem(id);
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setSwipedItem(null);
    }, 250);
  };

  const handleReset = () => {
    setTasks(INITIAL_TASKS);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-black text-sky-400">Swipe Gestures 👆</Text>
              <Text className="text-slate-400 text-xs">Pan Gestures, Interpolation & Spring Snap</Text>
            </View>

            {tasks.length < INITIAL_TASKS.length && (
              <Pressable
                onPress={handleReset}
                className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl"
              >
                <Text className="text-sky-400 font-bold text-xs">Reset All 🔄</Text>
              </Pressable>
            )}
          </View>

          {/* Instructions Banner */}
          <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-5 flex-row items-center gap-3">
            <Text className="text-2xl">👉</Text>
            <Text className="text-slate-300 text-xs flex-1 leading-relaxed">
              <strong>Swipe any card:</strong> Drag right or left to reveal the delete action. Spring physics automatically snaps back if not pulled past the threshold.
            </Text>
          </View>

          {/* Task List */}
          {tasks.length === 0 ? (
            <View className="flex-1 justify-center items-center py-16">
              <Text className="text-4xl mb-3">🎉</Text>
              <Text className="text-white font-bold text-base">All Tasks Cleared!</Text>
              <Text className="text-slate-400 text-xs mt-1 mb-4">You have swiped away all items.</Text>
              <Pressable
                onPress={handleReset}
                className="bg-sky-500 px-5 py-2.5 rounded-xl"
              >
                <Text className="text-white font-bold text-xs">Reload Tasks</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-3" />}
              renderItem={({ item }) => {
                const isDismissing = swipedItem === item.id;

                return (
                  <View className="relative rounded-2xl overflow-hidden">
                    {/* Background Delete Action Layer (Revealed underneath) */}
                    <View className="absolute inset-0 bg-red-600 rounded-2xl flex-row justify-between items-center px-6">
                      <Text className="text-white font-black text-xs">🗑️ DELETE</Text>
                      <Text className="text-white font-black text-xs">DELETE 🗑️</Text>
                    </View>

                    {/* Foreground Draggable Card */}
                    <View
                      className={`bg-slate-900 border border-slate-800 p-4 rounded-2xl justify-between transition-all ${
                        isDismissing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                      }`}
                    >
                      <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-white font-bold text-sm flex-1 pr-3">
                          {item.title}
                        </Text>
                        <View className={`px-2.5 py-0.5 rounded-full border ${item.color}`}>
                          <Text className="text-[10px] font-extrabold uppercase">
                            {item.priority}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row justify-between items-center mt-2 border-t border-slate-800/80 pt-2.5">
                        <Text className="text-slate-500 text-[11px] font-mono">
                          ID: #{item.id} • Gesture.Pan()
                        </Text>

                        {/* Interactive Swipe Trigger */}
                        <Pressable
                          onPress={() => handleDeleteTask(item.id)}
                          className="bg-slate-800 active:bg-red-500/20 px-3 py-1.5 rounded-lg border border-slate-700"
                        >
                          <Text className="text-red-400 font-bold text-xs">Swipe Away ➔</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}

        </View>

        {/* Gesture Physics Status Pill */}
        <View className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <Text className="text-slate-300 text-xs font-semibold">
              Native Gesture Recognizer
            </Text>
          </View>
          <Text className="text-sky-400 font-mono text-xs">Active 🎯</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **`Gesture.Pan()`**: Mobile screen meeda user finger ni drag chesthunappudu (left, right, up, down), aa finger coordinate changes (`event.translationX`, `event.translationY`) ni instantaneous ga calculate chesthundi.
- **Threshold & Spring Snap-back**: User card ni 40% kante ekkuva dooram swipe chesthe card screen nundi dismiss aypothundi (`withTiming`). Kani madhyaloney vadilithe, **`withSpring(0)`** valla card direct ga initial center position loki bounce ayyi snap-back avthundi!
- **Interpolation**: Card ni drag chesthunna distance (`translateX`) batti, card యొక్క opacity thaggadam and card slight ga tilt (rotate) avvadam lanti cinematic effects ni create cheyadaniki `interpolate()` use chestham.

---

### 🛠️ Quick Check:
In a Swipe-to-Dismiss gesture, if the user drags a card only 20 pixels and releases their finger, what should happen?  
👉 *Answer*: **Option B) The card should snap back to position 0 using `withSpring(0)`.**

---
---

# 📸 LEVEL 8: Native Device Hardware & Media (Permissions, Camera, GPS & Haptics)

---

## 🛡️ Level 8.1: Mobile OS Permissions Architecture & Lifecycle

### 1. Mental Model: The 2 Permission Layers 🔒

In mobile applications, permissions are strictly governed by the operating system (iOS & Android).

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: Manifest / Config Declaration                      │
│ • iOS (Info.plist): NSCameraUsageDescription                │
│ • Android (AndroidManifest.xml): <uses-permission />        │
│ 🚨 Rule: Declaring ONLY tells OS the app CAN ask for access!│
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Layer 2: Runtime User Grant (The OS Prompt)                 │
│ • The OS displays the system dialog box when requested.    │
│ • JavaScript receives: 'undetermined' | 'granted' | 'denied'│
└─────────────────────────────────────────────────────────────┘
```

---

### 2. The 4 Permission States & The "Blocked" Trap

```
                  ┌──────────────────┐
                  │ 1. UNDETERMINED  │ (App never prompted user yet)
                  └────────┬─────────┘
                           │
                   requestPermission()
                           ↓
                  ┌──────────────────┐
                  │  SYSTEM PROMPT   │
                  └────────┬─────────┘
                           │
       ┌───────────────────┼───────────────────┐
       ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  2. GRANTED  │    │  3. DENIED   │    │  4. LIMITED  │
└──────────────┘    └──────────────┘    └──────────────┘
 (Full Access)      (Blocked by User)   (Selected Photos
                                         only on iOS 14+)
```

- **Denied vs. Blocked (Settings-Only)**: Once a user permanently rejects a permission, the OS will **never show the popup again**. Calling `request...()` will immediately return `denied`.
- **The Solution (`Linking.openSettings()`)**: Your app must guide the user with a direct button to open the Phone's System Settings app.
- **The Lifecycle Connection (`AppState`)**: When the user switches back from Phone Settings, your app detects the `active` lifecycle event via `AppState` and **re-evaluates** the permission automatically!

---

### 💻 Code Example: Production Permission Lifecycle & AppState

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Linking, AppState } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [permissionStatus, setPermissionStatus] = useState('undetermined');
  const [lastCheckedTime, setLastCheckedTime] = useState('Just now');

  // 1. Silent Check (No popup)
  const checkCurrentPermission = async () => {
    setLastCheckedTime(new Date().toLocaleTimeString());
    return permissionStatus;
  };

  // 2. Contextual Permission Request
  const handleRequestPermission = async (simulatedOutcome = 'granted') => {
    if (permissionStatus === 'granted') {
      alert('Camera & Media access is ALREADY granted! ✅');
      return;
    }

    await new Promise((res) => setTimeout(res, 400));
    setPermissionStatus(simulatedOutcome);
    setLastCheckedTime(new Date().toLocaleTimeString());
  };

  // 3. Re-evaluate permission when returning from Phone Settings via AppState!
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkCurrentPermission();
      }
    });

    return () => subscription.remove();
  }, [permissionStatus]);

  const isGranted = permissionStatus === 'granted';
  const isDenied = permissionStatus === 'denied';
  const isLimited = permissionStatus === 'limited';

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          <View className="mb-5">
            <Text className="text-2xl font-black text-sky-400">OS Permissions 🛡️</Text>
            <Text className="text-slate-400 text-xs">
              Hardware Sandboxing, Runtime Prompts & AppState Lifecycle
            </Text>
          </View>

          {/* Permission Monitor Card */}
          <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mb-5 shadow-2xl">
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              Protected Hardware: Camera &amp; Photos
            </Text>

            <View className="flex-row items-center justify-between py-2 border-b border-slate-800/80 mb-3">
              <Text className="text-white font-bold text-base">OS State:</Text>
              <View
                className={`px-3 py-1 rounded-full border ${
                  isGranted
                    ? 'bg-emerald-500/20 border-emerald-500/40'
                    : isDenied
                    ? 'bg-red-500/20 border-red-500/40'
                    : isLimited
                    ? 'bg-purple-500/20 border-purple-500/40'
                    : 'bg-amber-500/20 border-amber-500/40'
                }`}
              >
                <Text
                  className={`text-xs font-black uppercase ${
                    isGranted
                      ? 'text-emerald-400'
                      : isDenied
                      ? 'text-red-400'
                      : isLimited
                      ? 'text-purple-400'
                      : 'text-amber-400'
                  }`}
                >
                  {permissionStatus}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-slate-400 text-xs">Lifecycle Sync:</Text>
              <Text className="text-sky-400 font-mono text-xs font-semibold">
                Checked at {lastCheckedTime}
              </Text>
            </View>
          </View>

          {/* Guided Settings Notice */}
          {isDenied && (
            <View className="bg-red-500/10 border border-red-500/30 p-5 rounded-3xl mb-5 gap-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">⚠️</Text>
                <Text className="text-red-400 font-bold text-sm">Access Blocked by OS</Text>
              </View>
              <Text className="text-slate-300 text-xs leading-relaxed">
                The user denied permission. Calling the request dialog again is blocked by the OS. Guide the user to Phone Settings to re-enable.
              </Text>
              <Pressable
                onPress={() => Linking.openSettings()}
                className="bg-red-500 active:bg-red-600 p-3.5 rounded-xl items-center"
              >
                <Text className="text-white font-black text-xs">
                  Open Phone System Settings ⚙️
                </Text>
              </Pressable>
            </View>
          )}

          {isGranted && (
            <View className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-3xl mb-5 gap-2">
              <Text className="text-emerald-400 font-bold text-sm">✅ Hardware Access Active</Text>
              <Text className="text-slate-300 text-xs">
                Your app is now authorized to launch the camera viewfinder and read native photo library assets.
              </Text>
            </View>
          )}
        </View>

        {/* Controls */}
        <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl gap-3 shadow-2xl">
          <Text className="text-slate-300 text-xs font-bold uppercase tracking-wider">
            Simulate OS Permission Outcomes:
          </Text>

          <View className="flex-row gap-2">
            <Pressable
              onPress={() => handleRequestPermission('granted')}
              className="flex-1 bg-emerald-500 active:bg-emerald-600 p-3 rounded-xl items-center"
            >
              <Text className="text-slate-950 font-black text-xs">Allow ✅</Text>
            </Pressable>

            <Pressable
              onPress={() => handleRequestPermission('denied')}
              className="flex-1 bg-red-500 active:bg-red-600 p-3 rounded-xl items-center"
            >
              <Text className="text-white font-black text-xs">Deny 🚫</Text>
            </Pressable>
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

---

### 🗣️ Telugu + English Explanation:
- **Manifest vs Runtime**: `AndroidManifest.xml` lo `<uses-permission>` pettina ventane access raadu. User app vaaduthunappudu screen meeda popup choopinchali.
- **`AppState` Lifecycle**: User Phone Settings loki velli permission "Allow" chesi mana app loki return raagane (`nextAppState === 'active'`), mana app automatic ga status re-check chesi UI ni update chesthundi!
- **`Linking.openSettings()`**: Permission block ayinappudu user ki instructions ivvadam tho paatu, direct ga phone settings open chese button ivvali.

---

### 🛠️ Quick Check:
What is the difference between declaring a permission in `AndroidManifest.xml` / `Info.plist` vs. requesting a permission at runtime?  
👉 *Answer*: **Option A) Declaring informs the OS that the app intends to use the feature; runtime requesting prompts the active user for authorization while using the app.**

---
---

## 📸 Level 8.2: Media Library, Image Picker & Camera Capture (`expo-image-picker`)

### 1. The 2 Methods for Media Access 📱

| Method | What it launches | Use Case |
| :--- | :--- | :--- |
| **`launchImageLibraryAsync(options)`** | Phone's Photo Gallery Roll | Uploading existing profile photos, receipt attachments, or documents. |
| **`launchCameraAsync(options)`** | Live Native Camera Shutter | Taking a fresh live selfie, scanning ID cards, or capturing live photos. |

---

### 2. The Big Mobile Memory Trap: File URI vs. Base64 💥

```
┌─────────────────────────────────────────────────────────────┐
│ ❌ Option A: Base64 String (Memory Disaster)                │
│   • Converts the 48 MP photo into a 60 MB text string in    │
│     JavaScript memory.                                      │
│   • Passing 60 MB strings over the bridge causes            │
│     severe frame drops & Out-Of-Memory (OOM) app crashes!   │
└─────────────────────────────────────────────────────────────┘
                             vs.
┌─────────────────────────────────────────────────────────────┐
│ ✅ Option B: Native File URI (Zero-RAM Pointer)             │
│   • The OS writes the JPEG photo directly to the phone disk.│
│   • JavaScript only holds a 40-character path string:       │
│     'file:///var/mobile/Containers/Data/.../photo.jpg'      │
│   • 0 MB JavaScript RAM overhead! Ultra fast & smooth! ⚡    │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. Essential Production Configuration Options

```javascript
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'], // or ['images', 'videos']
  allowsEditing: true,    // ✂️ Opens built-in native crop window before saving!
  aspect: [1, 1],         // 📐 Forces 1:1 square crop (Ideal for profile avatars!)
  quality: 0.7,           // 🗜️ Compresses 15 MB raw camera file down to ~1 MB without visual loss!
});
```

---

### 💻 Code Example: Complete Profile Avatar & Media Picker

```jsx
import React, { useState } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

const MediaPickerScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Pick from Gallery
  const handlePickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Photo Library permission is required! ⚠️');
      return;
    }

    setIsProcessing(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1], // 1:1 Square Crop
      quality: 0.7,   // 70% Compression
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Native File URI pointer
    }
    setIsProcessing(false);
  };

  // 2. Capture with Live Camera
  const handleCaptureFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera hardware permission is required! ⚠️');
      return;
    }

    setIsProcessing(true);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
    setIsProcessing(false);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          <View className="mb-5">
            <Text className="text-2xl font-black text-sky-400">Media Picker 📸</Text>
            <Text className="text-slate-400 text-xs">
              expo-image-picker, Native File URIs &amp; Image Compression
            </Text>
          </View>

          {/* Avatar Preview */}
          <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl items-center shadow-2xl mb-5">
            <View className="relative mb-4">
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  className="w-36 h-36 rounded-full border-4 border-sky-400/30"
                />
              ) : (
                <View className="w-36 h-36 rounded-full bg-slate-800 border-4 border-slate-700 items-center justify-center">
                  <Text className="text-slate-400 text-xs font-bold">No Photo Selected</Text>
                </View>
              )}
            </View>

            <Text className="text-white font-extrabold text-lg">Profile Avatar</Text>
            <Text className="text-slate-400 text-xs">
              {imageUri ? 'Native File URI Active ✅' : 'Choose an option below'}
            </Text>
          </View>
        </View>

        {/* Action Controls */}
        <View className="flex-row gap-2">
          <Pressable
            disabled={isProcessing}
            onPress={handleCaptureFromCamera}
            className="flex-1 bg-sky-500 active:bg-sky-600 p-4 rounded-2xl items-center justify-center shadow-lg"
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white font-black text-xs">Capture Photo 📷</Text>
            )}
          </Pressable>

          <Pressable
            disabled={isProcessing}
            onPress={handlePickFromGallery}
            className="flex-1 bg-indigo-500 active:bg-indigo-600 p-4 rounded-2xl items-center justify-center shadow-lg"
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white font-black text-xs">Pick Gallery 🖼️</Text>
            )}
          </Pressable>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MediaPickerScreen;
```

---

### 🗣️ Telugu + English Explanation:
- **`allowsEditing: true`**: User photo theeyagane or select cheyagane OS direct ga crop window open chesthundi (square lo crop cheyochu).
- **`quality: 0.7`**: High-end phones lo photo theesthe 15 MB to 20 MB size untundi. `quality: 0.7` pettadam valla visual clarity taggakunda file size **1 MB ki compress** aypothundi.
- **File URI**: JavaScript memory lo photo data pettakunda, phone hard disk lo save ayina file address (`file:///...`) theskuntam. Deeni valla app 100% smooth ga run avthundi.

---

### 🛠️ Quick Check:
When uploading an avatar to your server via `multipart/form-data`, what should you pass as the image source in React Native?  
👉 *Answer*: **Option B) An object containing `{ uri: result.assets[0].uri, name: 'avatar.jpg', type: 'image/jpeg' }`.**

---
---

## 📍 Level 8.3: Location, GPS Tracking & Reverse Geocoding (`expo-location`)

### 1. Foreground vs. Background Location Permissions 🛰️

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Foreground Location (While App Is In Use)                │
│   • Location.requestForegroundPermissionsAsync()            │
│   • Allowed ONLY while the app is actively on the screen.   │
│   • Use case: Showing nearby restaurants on Zomato/Swiggy.  │
└─────────────────────────────────────────────────────────────┘
                             vs.
┌─────────────────────────────────────────────────────────────┐
│ 2. Background Location (Always Allowed / In Background)     │
│   • Location.requestBackgroundPermissionsAsync()            │
│   • Tracks GPS even when the phone is locked in your pocket!│
│   • Strict Store Guidelines (Google/Apple heavily review!). │
│   • Use case: Uber driver navigation, fitness run tracking. │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. Reverse Geocoding & Distance Filtering 🔋

- **Reverse Geocoding**: Converts raw coordinates `{ latitude: 17.4483, longitude: 78.3915 }` into human-readable street addresses: *"HITEC City, Hyderabad, 500081"*.
- **Battery Optimization (`distanceInterval`)**: Prevents constant GPS waking by triggering updates only after moving 10+ meters:

```javascript
const subscription = await Location.watchPositionAsync(
  {
    accuracy: Location.Accuracy.Balanced, // Battery balance
    timeInterval: 2000,
    distanceInterval: 10,                // ⚡ Only notify if moved 10+ meters!
  },
  (location) => {
    console.log('Coordinates:', location.coords);
  }
);
```

---

### 💻 Code Example: GPS Tracking & Reverse Geocoding

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

const LocationScreen = () => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // 1. Single Snapshot
  const fetchSingleLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission is required! ⚠️');
      return;
    }

    setIsFetching(true);
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setCoords(location.coords);

    const reverse = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    if (reverse.length > 0) {
      setAddress(`${reverse[0].street}, ${reverse[0].city}, ${reverse[0].postalCode}`);
    }
    setIsFetching(false);
  };

  // 2. Continuous Watcher
  useEffect(() => {
    let subscription = null;

    const startWatching = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 2000,
          distanceInterval: 10,
        },
        async (loc) => {
          setCoords(loc.coords);
          const reverse = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
          if (reverse.length > 0) {
            setAddress(`${reverse[0].street}, ${reverse[0].city}, ${reverse[0].postalCode}`);
          }
        }
      );
    };

    if (isLiveTracking) startWatching();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isLiveTracking]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          <View className="mb-5">
            <Text className="text-2xl font-black text-sky-400">GPS &amp; Location 📍</Text>
            <Text className="text-slate-400 text-xs">
              expo-location, Live Subscriptions &amp; Reverse Geocoding
            </Text>
          </View>

          <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-4 shadow-2xl">
            <Text className="text-slate-400 text-xs font-bold uppercase mb-2">Live GPS Coordinates</Text>
            {coords ? (
              <View className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-3">
                <Text className="text-sky-400 font-mono text-sm font-bold">
                  Lat: {coords.latitude.toFixed(4)}° N
                </Text>
                <Text className="text-sky-400 font-mono text-sm font-bold mt-1">
                  Long: {coords.longitude.toFixed(4)}° E
                </Text>
              </View>
            ) : (
              <View className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-3 items-center">
                <Text className="text-slate-500 text-xs">No GPS data loaded yet</Text>
              </View>
            )}

            {address && (
              <View className="bg-sky-500/10 border border-sky-500/30 p-3.5 rounded-2xl">
                <Text className="text-sky-400 font-bold text-xs uppercase mb-1">📍 Street Address:</Text>
                <Text className="text-white font-extrabold text-sm">{address}</Text>
              </View>
            )}
          </View>
        </View>

        <View className="gap-2.5">
          <Pressable
            onPress={() => setIsLiveTracking((prev) => !prev)}
            className={`p-4 rounded-2xl items-center justify-center shadow-lg ${
              isLiveTracking ? 'bg-amber-500 active:bg-amber-600' : 'bg-emerald-500 active:bg-emerald-600'
            }`}
          >
            <Text className="text-slate-950 font-black text-xs uppercase">
              {isLiveTracking ? 'Stop Live GPS Tracking 🛑' : 'Start Live GPS Watcher (watchPositionAsync) 🛰️'}
            </Text>
          </Pressable>

          <Pressable
            disabled={isFetching || isLiveTracking}
            onPress={fetchSingleLocation}
            className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl items-center"
          >
            {isFetching ? (
              <ActivityIndicator size="small" color="#38bdf8" />
            ) : (
              <Text className="text-sky-400 font-bold text-xs">
                Fetch Single Position (getCurrentPositionAsync) 🎯
              </Text>
            )}
          </Pressable>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LocationScreen;
```

---

### 🗣️ Telugu + English Explanation:
- **`getCurrentPositionAsync` vs `watchPositionAsync`**:
  - `getCurrent...`: Swiggy delivery location theskodaniki ఒక్కసారి GPS check chesi chip ni off chesthundi.
  - `watch...`: Uber driver live map movement kosam continuous ga GPS coordinates ni stream chesthundi.
- **`distanceInterval: 10`**: User కనీసం 10 మీటర్లు move ayitheనే GPS calculate cheyali ani rule pedatham, deeni valla phone battery drain avvadu.

---

### 🛠️ Quick Check:
Why is setting `distanceInterval: 10` recommended when using `Location.watchPositionAsync` in a live mobile tracking app?  
👉 *Answer*: **Option B) To prevent unnecessary battery drain by triggering location updates only when the device moves a meaningful distance.**

---
---

## 📳 Level 8.4: Haptic Feedback & Tactile UX (`expo-haptics`)

### 1. The 3 Haptic Engine Primitives

| Method | What it feels like | Best Use Case |
| :--- | :--- | :--- |
| **`Haptics.impactAsync(style)`** | Sharp mechanical tap / click. | Button presses, toggle switches, tab navigation. |
| **`Haptics.notificationAsync(type)`** | Distinct semantic vibration rhythm. | Payment success, wrong password shake, warning alerts. |
| **`Haptics.selectionAsync()`** | Ultra-light micro-tick. | Scrolling through date pickers, number steppers, sliders. |

---

### 💻 Code Example: Tactile Soundboard & Stepper Micro-Ticks

```jsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

const HapticsScreen = () => {
  const [stepper, setStepper] = useState(5);

  // 1. Button Mechanical Taps
  const handleButtonTap = (style) => {
    Haptics.impactAsync(style);
  };

  // 2. Payment & Error Alerts
  const handlePaymentSuccess = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    alert('Payment Successful! ₹500 transferred 💳');
  };

  const handleWrongPassword = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    alert('Invalid Passcode! Please try again ❌');
  };

  // 3. Stepper Wheel Micro-Tick
  const handleStep = (delta) => {
    Haptics.selectionAsync(); // Ultra-light tactile tick
    setStepper((prev) => Math.max(0, Math.min(10, prev + delta)));
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          <View className="mb-5">
            <Text className="text-2xl font-black text-sky-400">Haptics &amp; Tactile UX 📳</Text>
            <Text className="text-slate-400 text-xs">
              expo-haptics: Mechanical Impacts, Notifications &amp; Wheel Ticks
            </Text>
          </View>

          {/* Section 1: Impacts */}
          <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-4 gap-2.5">
            <Text className="text-white font-bold text-xs uppercase">1. Mechanical Impacts:</Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => handleButtonTap(Haptics.ImpactFeedbackStyle.Light)}
                className="flex-1 bg-slate-800 p-3 rounded-xl items-center"
              >
                <Text className="text-sky-400 font-bold text-xs">Light 🪶</Text>
              </Pressable>
              <Pressable
                onPress={() => handleButtonTap(Haptics.ImpactFeedbackStyle.Medium)}
                className="flex-1 bg-slate-800 p-3 rounded-xl items-center"
              >
                <Text className="text-indigo-400 font-bold text-xs">Medium 🔘</Text>
              </Pressable>
              <Pressable
                onPress={() => handleButtonTap(Haptics.ImpactFeedbackStyle.Heavy)}
                className="flex-1 bg-slate-800 p-3 rounded-xl items-center"
              >
                <Text className="text-purple-400 font-bold text-xs">Heavy 🔨</Text>
              </Pressable>
            </View>
          </View>

          {/* Section 2: Notifications */}
          <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-4 gap-2.5">
            <Text className="text-white font-bold text-xs uppercase">2. App Notifications:</Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={handlePaymentSuccess}
                className="flex-1 bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-xl items-center"
              >
                <Text className="text-emerald-400 font-bold text-xs">Success ✅</Text>
              </Pressable>
              <Pressable
                onPress={handleWrongPassword}
                className="flex-1 bg-red-500/20 border border-red-500/40 p-3 rounded-xl items-center"
              >
                <Text className="text-red-400 font-bold text-xs">Error ❌</Text>
              </Pressable>
            </View>
          </View>

          {/* Section 3: Stepper Tick */}
          <View className="bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-2">
            <Text className="text-white font-bold text-xs uppercase">3. Selection Stepper (Micro-Ticks):</Text>
            <View className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex-row justify-between items-center">
              <Pressable
                onPress={() => handleStep(-1)}
                className="w-10 h-10 bg-slate-800 rounded-xl items-center justify-center"
              >
                <Text className="text-white font-bold text-base">-</Text>
              </Pressable>
              <Text className="text-white font-black text-xl">{stepper}</Text>
              <Pressable
                onPress={() => handleStep(1)}
                className="w-10 h-10 bg-slate-800 rounded-xl items-center justify-center"
              >
                <Text className="text-white font-bold text-base">+</Text>
              </Pressable>
            </View>
          </View>

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HapticsScreen;
```

---

### 🗣️ Telugu + English Explanation:
- **`Haptics.impactAsync`**: Button tap chesinappudu physical phone lo real switch nokkinattu mechanical feel isthundi.
- **`Haptics.notificationAsync(Success)`**: Google Pay or PhonePe lo payment successful ayinappudu phone double-buzz ayye feel ni create chesthundi.
- **`Haptics.selectionAsync`**: Date picker or quantity stepper scroll chesthunappudu prathi number change ki subtle micro-tick vibration isthundi.

---

### 🛠️ Quick Check:
Which haptic method should you trigger when a user completes a successful UPI payment in a fintech app?  
👉 *Answer*: **Option B) `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)`.**

---
---

# ⚡ LEVEL 9: Mobile Performance & Optimization

---

## 🏎️ Level 9.1: The 16.6ms Frame Budget & Thread Bottlenecks

### 1. Mental Model: The 16.6ms Display Rule ⏱️

Mobile screens refresh at **60 Hz** (or **120 Hz** on ProMotion / High-Refresh screens):

$$\text{Time per Frame at 60 FPS} = \frac{1000\text{ ms}}{60\text{ frames}} = \mathbf{16.67\text{ ms}}$$
$$\text{Time per Frame at 120 FPS} = \frac{1000\text{ ms}}{120\text{ frames}} = \mathbf{8.33\text{ ms}}$$

```
┌─────────────────────────────────────────────────────────────┐
│ 🟢 Smooth 60 FPS (Execution finishes within 16.6ms)        │
│ [ Frame 1: 12ms ] ──▶ [ Frame 2: 14ms ] ──▶ [ Frame 3: 11ms]│
│ Result: Buttery smooth scrolling! 🏎️                         │
└─────────────────────────────────────────────────────────────┘
                             vs.
┌─────────────────────────────────────────────────────────────┐
│ 🔴 Janky Stutter (Heavy JS task takes 50ms)                 │
│ [ Frame 1: 12ms ] ──▶ [ 🚨 HEAVY JS BLOCK: 50ms ] ─────────▶│
│ Result: 3 FRAMES DROPPED! Screen freezes and stutters! ❌    │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. The 3 Primary Mobile Performance Bottlenecks 🚨

| Bottleneck | What Causes It | How to Fix It |
| :--- | :--- | :--- |
| **1. JS Thread Starvation** | Running synchronous loops, parsing 10 MB JSON, or sorting 5,000 array items on the main thread. | Offload heavy work to Web Workers, chunk arrays with `setTimeout`, or use `useMemo`. |
| **2. UI Thread Overdraw** | Stacking 10 layers of transparent `<View>` containers and heavy elevation shadows. | Flatten component hierarchy, remove redundant background colors. |
| **3. Garbage Collection (GC) Spikes** | Creating new anonymous functions or objects inside `renderItem` loops (`onPress={() => doSomething(item)}`). | Use `useCallback` and extract static items to prevent memory thrashing. |

---

### 💻 Code Example: Frame Budget Simulator & Non-blocking Chunking

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const PerformanceScreen = () => {
  const [fps, setFps] = useState(60);
  const [frameTimeMs, setFrameTimeMs] = useState(16.6);
  const [isLagging, setIsLagging] = useState(false);

  // 1. Simulating a Blocking Synchronous JS Loop (Freezes Frame Budget)
  const handleTriggerBlockingJSTask = () => {
    setIsLagging(true);
    setFrameTimeMs(84.2);
    setFps(12); // Severe frame drop

    // Heavy blocking loop (simulates un-memoized heavy calculations)
    const start = Date.now();
    while (Date.now() - start < 80) {
      // Synchronously hogs the JavaScript thread for 80ms!
    }

    setTimeout(() => {
      setIsLagging(false);
      setFrameTimeMs(16.6);
      setFps(60);
    }, 1200);
  };

  // 2. Optimized Non-blocking Chunking
  const handleOptimizedChunkTask = () => {
    setIsLagging(false);
    setFrameTimeMs(16.6);
    setFps(60); // 60 FPS Preserved!

    setTimeout(() => {
      console.log('Heavy work offloaded asynchronously without blocking the UI thread!');
    }, 0);
  };

  const isCritical = fps < 30;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          <View className="mb-5">
            <Text className="text-2xl font-black text-sky-400">Frame Rate Budget ⚡</Text>
            <Text className="text-slate-400 text-xs">
              The 16.6ms Budget (60 FPS), Dropped Frames &amp; Thread Starvation
            </Text>
          </View>

          {/* FPS Gauge Card */}
          <View className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mb-5 shadow-2xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Display Performance
              </Text>
              <View
                className={`px-3 py-1 rounded-full border ${
                  isCritical
                    ? 'bg-red-500/20 border-red-500/40'
                    : 'bg-emerald-500/20 border-emerald-500/40'
                }`}
              >
                <Text
                  className={`text-xs font-black uppercase ${
                    isCritical ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {isCritical ? '🚨 Frame Drops Detected' : '⚡ 60 FPS Optimal'}
                </Text>
              </View>
            </View>

            <View className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex-row justify-around items-center">
              <View className="items-center">
                <Text
                  className={`text-4xl font-black ${
                    isCritical ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {fps}
                </Text>
                <Text className="text-slate-400 text-[10px] uppercase font-bold mt-0.5">
                  Frames / Sec
                </Text>
              </View>

              <View className="h-10 w-[1px] bg-slate-800" />

              <View className="items-center">
                <Text
                  className={`text-4xl font-black font-mono ${
                    isCritical ? 'text-amber-400' : 'text-sky-400'
                  }`}
                >
                  {frameTimeMs}
                </Text>
                <Text className="text-slate-400 text-[10px] uppercase font-bold mt-0.5">
                  ms / Frame (Max: 16.6ms)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Controls */}
        <View className="gap-2.5">
          <Pressable
            disabled={isLagging}
            onPress={handleTriggerBlockingJSTask}
            className="bg-red-500 active:bg-red-600 p-4 rounded-2xl items-center justify-center shadow-lg"
          >
            {isLagging ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white font-black text-xs uppercase">
                1. Block JS Thread (Heavy Sync Loop) 🛑
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={handleOptimizedChunkTask}
            className="bg-emerald-500 active:bg-emerald-600 p-4 rounded-2xl items-center justify-center shadow-lg"
          >
            <Text className="text-slate-950 font-black text-xs uppercase">
              2. Optimized Async Execution (Preserves 60 FPS) ⚡
            </Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PerformanceScreen;
```

---

### 🗣️ Telugu + English Explanation:
- **16.6ms Budget**: Mobile screen meeda 60 FPS smooth animation ravali ante, mana JavaScript code and UI rendering **16.6 milliseconds lopalane** complete avvali.
- **Dropped Frame (Lag)**: Okavela heavy calculation or un-memoized heavy list re-render valla 50ms pattindi anukondi... screen 3 frames skip chesi **stutter (lag) avthundi!**
- **Garbage Collection (GC) Spikes**: `renderItem` loop lopalane inline functions `() => {}` create chesthe, phone memory full ayyi garbage collector clean cheyadaniki screen ni freeze chesthundi.

---

### 🛠️ Quick Check:
In a 60 Hz mobile display, what is the maximum time window (frame budget) your JavaScript and rendering code has to complete before dropping a frame?  
👉 *Answer*: **Option B) 16.67 milliseconds.**

---
---

## 🚀 Level 9.2: FlatList Recycling Limitations vs. Shopify `FlashList`

### 1. The Big Flaw in React Native's `FlatList` 🐢

Traditional `FlatList` uses **Virtualization**, but **NOT Cell Recycling**:

```
[ FlatList Scrolling ⬇️ ]
1. Item 1 scrolls off top    ──▶ FlatList UNMOUNTS and destroys native view 💥
2. Item 15 enters from bottom ──▶ FlatList CREATES a brand new native view 🏗️
🚨 FAST SCROLL PROBLEM: When user scrolls fast, JS cannot create native views fast enough!
   Result: User sees BLANK WHITE RECTANGLES (Blank frames)! ⬜
```

---

### 2. How Shopify `FlashList` Solves This: Cell Recycling ⚡

Instead of destroying and recreating views, **`FlashList` recycles existing native views** (identical to Android's native `RecyclerView` & iOS's `UICollectionView`):

```
[ FlashList Scrolling ⬇️ (Only ~10 Native Views ever exist!) ]
1. View #1 scrolls off the top.
2. FlashList DOES NOT destroy View #1. ❌
3. FlashList immediately REPOSITIONS View #1 to the bottom and swaps in Item #15's data props! ♻️
Result: ZERO view creations in memory! 10x faster! ZERO blank frames! 🏎️💨
```

---

### 3. Comparison Table: `FlatList` vs. `FlashList`

| Feature | Standard `FlatList` | Shopify `FlashList` ⚡ |
| :--- | :--- | :--- |
| **Engine Architecture** | Continuous Mount / Unmount | **True Native Cell Recycling (`RecyclerView`)** |
| **Blank Tiles on Fast Scroll** | Common ❌ (White boxes) | **Zero 0ms Blank Lag ✅** |
| **Memory Consumption** | High (constant GC garbage) | **Ultra Low & Flat Memory Usage** |
| **Drop-in Replacement** | Default React Native | Same API! Just add `estimatedItemSize` |

---

### 4. The Mandatory `estimatedItemSize` Prop 📐

Because FlashList pre-allocates layout cells before you even scroll, you **must** supply an estimated height (in pixels):

```javascript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={products}
  renderItem={({ item }) => <ProductCard item={item} />}
  estimatedItemSize={84} // 📐 Average height of your card in pixels!
/>
```

---

### 💻 Code Example: Shopify FlashList Implementation

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FlashList } from '@shopify/flash-list';

const FEED_DATA = Array.from({ length: 100 }, (_, i) => ({
  id: String(i + 1),
  title: `Mobile Performance Tip #${i + 1}`,
  category: i % 2 === 0 ? 'Memory' : 'Rendering',
  likes: (i * 23) % 400 + 10,
}));

const FlashListDemo = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          <View className="mb-4">
            <Text className="text-2xl font-black text-sky-400">FlashList 🚀</Text>
            <Text className="text-slate-400 text-xs">
              Shopify Native Cell Recycling Engine vs. FlatList Blank Frames
            </Text>
          </View>

          {/* FlashList Component */}
          <View className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-3 overflow-hidden">
            <FlashList
              data={FEED_DATA}
              keyExtractor={(item) => item.id}
              estimatedItemSize={72} // 📐 Pre-allocates native recycling slots
              ItemSeparatorComponent={() => <View className="h-2.5" />}
              renderItem={({ item }) => (
                <View className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl flex-row justify-between items-center">
                  <View className="flex-1 pr-2">
                    <Text className="text-white font-bold text-xs">{item.title}</Text>
                    <Text className="text-slate-400 text-[10px] mt-0.5">
                      Category: {item.category}
                    </Text>
                  </View>
                  <View className="bg-sky-500/10 border border-sky-500/30 px-2.5 py-1 rounded-lg">
                    <Text className="text-sky-400 font-bold text-xs">❤️ {item.likes}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FlashListDemo;
```

---

### 🗣️ Telugu + English Explanation:
- **Restaurant Plates Analogy (FlashList vs FlatList)**:
  - **FlatList**: Prathi customer raagane kotha plate koni, customer vellagane plate ni pagalgotti dustbin lo vesthundi. Fast ga customers vasthe plates leka **Blank white spaces** vasthayi!
  - **FlashList**: Hotel lo 10 plates mathrame unchukuntundi. Okadu tinesi vellagane aa plate ni clean chesi next customer ki **recycle** chesthundi! 1,000 items unna kooda app 120 FPS speed tho glide avthundi!
- **`estimatedItemSize`**: FlashList ki list card యొక్క average height (e.g. `72px`) munde cheptham, deeni valla native engine scrolling positions ni instant ga pre-calculate chesthundi.

---

### 🛠️ Quick Check:
Why does Shopify `FlashList` deliver up to 10x better performance than React Native's default `FlatList` on large lists?  
👉 *Answer*: **Option B) Because FlashList recycles a fixed pool of native view cells instead of constantly creating and destroying views during scroll.**

---
---

## ⏳ Level 9.3: Screen Transition Freezes & `InteractionManager`

### 1. The Screen Navigation Freeze Problem 🐢

```
[ User Taps "View Analytics" ➔ 300ms Native Slide Animation Begins 📲 ]
                             │
            🚨 THE NAVIGATION JANK TRAP:
            React Native tries to render and calculate heavy charts 
            DURING the 300ms slide animation!
                             │
            Result: The slide animation freezes halfway across the screen, 
            drops to 5 FPS, and stutters! ❌
```

---

### 2. The Solution: `InteractionManager.runAfterInteractions` ⚡

```
[ User Taps "View Analytics" ]
         │
         ├── 1. Screen slides into view at 60 FPS (Silky Smooth! 🏎️)
         │      Shows lightweight <ActivityIndicator />
         │
         └── 2. Animation Finishes (300ms settles)
                │
                └──▶ InteractionManager.runAfterInteractions(() => {
                       // ⚡ Heavy chart calculation executes NOW!
                     });
```

---

### 💻 Code Example: Deferred Navigation Execution

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, InteractionManager } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const HeavyAnalyticsScreen = ({ onGoBack }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // ⚡ Defer heavy computations until the screen slide animation settles!
    const task = InteractionManager.runAfterInteractions(() => {
      const generated = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Telemetry Signal #${i + 1}`,
        latency: Math.floor(Math.random() * 200) + 20,
      }));
      setData(generated);
      setLoading(false);
    });

    return () => task.cancel();
  }, []);

  return (
    <View className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-5 justify-between">
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white font-black text-base">Heavy Analytics 📊</Text>
          <Pressable onPress={onGoBack} className="bg-slate-800 px-3 py-1.5 rounded-xl">
            <Text className="text-sky-400 font-bold text-xs">← Back</Text>
          </Pressable>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center py-16 gap-3">
            <ActivityIndicator size="large" color="#38bdf8" />
            <Text className="text-slate-400 text-xs font-semibold">
              Waiting for screen animation to settle...
            </Text>
          </View>
        ) : (
          <View className="gap-2">
            <Text className="text-emerald-400 font-bold text-xs">
              ✅ 50 Telemetry Signals Loaded (Zero Screen Freeze)
            </Text>
            {data.slice(0, 4).map((item) => (
              <View key={item.id} className="bg-slate-950 p-3 rounded-xl flex-row justify-between border border-slate-800">
                <Text className="text-slate-300 text-xs">{item.title}</Text>
                <Text className="text-sky-400 font-mono text-xs font-bold">{item.latency} ms</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default HeavyAnalyticsScreen;
```

---

### 🗣️ Telugu + English Explanation:
- **Navigation Freezing Problem**: HomeScreen nundi Heavy Analytics screen ki navigate ayinappudu, 300ms screen slide animation madhyaloney chart calculations run ayithe screen madhyalo aagi **lag / stutter** avthundi.
- **`InteractionManager` Magic**: Screen motham smooth ga slide ayyi vachesenthavaraku heavy task ni **queue (hold)** lo unchuthundi. Animation aagagane calculations run chesi data chupisthundi. 60 FPS animation smooth ga slide avthundi!

---

### 🛠️ Quick Check:
What is the primary purpose of `InteractionManager.runAfterInteractions` in React Native?  
👉 *Answer*: **Option B) To delay heavy JavaScript calculations until after active animations and screen transitions have finished.**

---
---

## 🔍 Level 9.4: Production Profiling & Critical Mobile Anti-Patterns

### 1. The `console.log` Production Bottleneck 🚨

```
┌─────────────────────────────────────────────────────────────┐
│ 🚨 The console.log Bridge Trap:                             │
│   • Every console.log() stringifies data synchronously and  │
│     sends it across the bridge to Android Logcat / Xcode.   │
│   • In a FlatList with 50 items, calling console.log()      │
│     inside renderItem drops FPS from 60 ➔ 15 FPS! ❌        │
└─────────────────────────────────────────────────────────────┘
```

#### ✅ The Production Fix (`babel.config.js`):

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      process.env.NODE_ENV === 'production' && 'transform-remove-console',
    ].filter(Boolean),
  };
};
```

---

### 2. Anonymous Inline Functions & Garbage Collection (GC) Pauses 🗑️

- Creating `() => handlePress(item.id)` inside `renderItem` generates thousands of short-lived function references.
- Causes heavy **Garbage Collection (GC) Pauses** where the JavaScript engine freezes execution to free up memory.
- **Fix**: Use `React.memo` on the child card and wrap handlers in `useCallback`.

---

### 💻 Code Example: Production Memoized List & Zero GC Pauses

```jsx
import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// 1. Memoized Child Component (Prevents Unneeded Re-renders & GC Garbage)
const MemoizedFeedCard = React.memo(({ item, onSelect }) => (
  <View className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex-row justify-between items-center mb-2">
    <View>
      <Text className="text-white font-bold text-xs">{item.title}</Text>
      <Text className="text-slate-400 text-[10px]">Author: @{item.author}</Text>
    </View>
    <Pressable
      onPress={() => onSelect(item.id)}
      className="bg-sky-500/20 border border-sky-500/40 px-3 py-1.5 rounded-xl"
    >
      <Text className="text-sky-400 font-bold text-xs">Select</Text>
    </Pressable>
  </View>
));

const ProfilingAuditScreen = () => {
  const [selectedId, setSelectedId] = useState(null);

  // 2. Memoized Callback Reference (Zero RAM Thrashing)
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const SAMPLE_DATA = [
    { id: '1', title: 'Zero Console Bridge Overhead', author: 'kiran' },
    { id: '2', title: 'React.memo List Cell Recycling', author: 'alex' },
    { id: '3', title: 'Flat Yoga Node Hierarchy', author: 'sara' },
  ];

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#090d16" />
      <SafeAreaView className="flex-1 bg-slate-950 px-5 pt-3 justify-between pb-6">
        
        <View className="flex-1">
          <View className="mb-5">
            <Text className="text-2xl font-black text-sky-400">Production Audit 🔍</Text>
            <Text className="text-slate-400 text-xs">
              Strip console.log, Memoized Callbacks &amp; Zero GC Pauses
            </Text>
          </View>

          {/* Health Score Summary Card */}
          <View className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-5 shadow-2xl items-center">
            <Text className="text-slate-400 text-xs font-bold uppercase mb-1">Architecture Health:</Text>
            <Text className="text-4xl font-black text-emerald-400 mb-2">100 / 100 ✅</Text>
            <View className="bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full">
              <Text className="text-emerald-400 font-bold text-xs">60 FPS Production Ready</Text>
            </View>
          </View>

          {/* Memoized List */}
          <Text className="text-white font-bold text-sm mb-3">Optimized List Rendering:</Text>
          <FlatList
            data={SAMPLE_DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MemoizedFeedCard item={item} onSelect={handleSelect} />
            )}
          />
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfilingAuditScreen;
```

---

### 🗣️ Telugu + English Explanation:
- **`console.log` in Production**: Dev lo `console.log` parvaledu. Kani production APK lo prathi log kooda phone bridge meeda heavy traffic create chesi **app ni lag chesthundi**. `transform-remove-console` babel plugin tho production lo anni logs automatic ga remove cheyali.
- **Inline Function & GC Pauses**: `renderItem` lopalane `onPress={() => doSomething(item)}` ani anonymous function rasthe, user scroll chesinappudalla memory lo lakshallo functions create avthayi. Phone RAM full ayyi clean cheyadaniki screen **freeze (GC pause)** avthundi! `React.memo` and `useCallback` vaadithe 100% smooth ga untundi.

---

### 🛠️ Quick Check:
Why should `console.log` statements be stripped from production release builds in React Native?  
👉 *Answer*: **Option B) Because console.log synchronously serializes data across the native bridge, causing major UI thread slowdowns and dropped frames.**

---
---

# ⚙️ LEVEL 10: Native Modules, JSI & The New Architecture

---

## 🌉 Level 10.1: The Asynchronous JSON Bridge vs. JavaScript Interface (JSI)

### 1. The Old Architecture: The JSON Bridge Bottleneck 🐢

```
[ JavaScript World ]                        [ Native Android / iOS World ]
         │                                                 │
         ▼                                                 ▲
1. JSON.stringify()                                 3. JSON.parse()
         │                                                 │
         └──────────▶ [ 🌉 THE ASYNC BRIDGE ] ─────────────┘
                        (Like a Postal Letter)
```

#### 🗣️ Tenglish Explanation (The Post Box Analogy):
- **Old Bridge (Postal Letter):** JavaScript and Native Java/Swift vere vere rooms lo untayi. JavaScript emaina Native ki cheppalante, data ni oka **JSON text Letter** lo raasi (`JSON.stringify`), bridge post box lo veyali. Native side vadu aa letter open chesi (`JSON.parse`) chadavali.
- **Problem:** Prathi touch gesture ki, prathi scroll ki lakshallo letters pampisthe **Bridge queue jam ayyi app lag avthundi!**

---

### 2. The New Architecture: JSI (JavaScript Interface) ⚡

```
[ JavaScript Engine (Hermes) ] ◄── DIRECT C++ MEMORY ──► [ Native C++ / Java / Swift ]
                               (Face-to-Face Direct Talking!)
```

- **JSI (Face-to-Face Direct Talking):** Madhyalo unna Bridge and Post Box ni padesaru. C++ dwara JavaScript and Native direct ga **same memory** ni share cheskuntayi.
- **Direct Synchronous Calls:** JS direct ga native function ni **0 milliseconds lo instant ga synchronous ga** call chesthundi!

---

### 💻 Code Example: Old Bridge vs. New JSI Side-by-Side

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const ArchitectureCodeComparison = () => {
  const [oldResult, setOldResult] = useState('Not called');
  const [newResult, setNewResult] = useState('Not called');

  // 1. OLD BRIDGE APPROACH (Always Async Promise)
  const handleOldBridgeCall = async () => {
    setOldResult('Waiting for Bridge...');
    await new Promise((resolve) => setTimeout(resolve, 30));
    setOldResult('85% (Promise resolved after Bridge trip)');
  };

  // 2. NEW JSI APPROACH (Direct Synchronous Memory Call)
  const handleNewJsiCall = () => {
    const resultFromJsi = 85;
    setNewResult(`${resultFromJsi}% (Instant C++ direct memory call)`);
  };

  return (
    <View>
      <Text>--- OLD BRIDGE vs NEW JSI ---</Text>

      <View>
        <Text>1. Old Bridge (Async Promise):</Text>
        <Button title="Call via Old Bridge 🐢" onPress={handleOldBridgeCall} />
        <Text>Old Status: {oldResult}</Text>
      </View>

      <Text>----------------------------</Text>

      <View>
        <Text>2. New JSI (Direct Memory):</Text>
        <Button title="Call via New JSI ⚡" onPress={handleNewJsiCall} />
        <Text>New Status: {newResult}</Text>
      </View>
    </View>
  );
};

export default ArchitectureCodeComparison;
```

---

### 🛠️ Quick Check:
In the New React Native Architecture, how does JavaScript talk to Native code without using the JSON bridge?  
👉 *Answer*: **Option B) Using JSI (JavaScript Interface) with direct C++ shared memory pointers.**

---
---

## ⚡ Level 10.2: TurboModules & Lazy Loading

### 1. The Old Problem: Eager Loading on App Startup 🐢

```
[ App Launch 🚀 ] ──▶ React Native forces ALL 50+ Native Modules to load into RAM immediately!
                        ├── Camera Module (Loaded in memory 📦)
                        ├── Bluetooth Module (Loaded in memory 📦)
                        ├── Payment Gateway Module (Loaded in memory 📦)
                        └── Location GPS Module (Loaded in memory 📦)
🚨 RESULT: App Cold Start takes 3 to 5 seconds just to show the login screen!
```

---

### 2. What are TurboModules? (Lazy Loading ⚡)

```
[ App Launch 🚀 ] ──▶ ONLY loads the core JavaScript! (Takes 0.3s! ⚡)
                        │
User taps "Open Camera" ──▶ 📸 ONLY Camera TurboModule loads into RAM on demand!
(Bluetooth & Payments are NEVER loaded if the user doesn't use them!)
```

---

### 💻 Code Example: TurboModules On-Demand Loading

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const TurboModuleDemo = () => {
  const [moduleStatus, setModuleStatus] = useState('Camera: Sleeping in disk (0 MB RAM)');

  const handleOpenScanner = () => {
    // ⚡ TurboModule loads into RAM ONLY on this click!
    setModuleStatus('Camera TurboModule: Initialized on-demand via JSI! ✅');
  };

  return (
    <View>
      <Text>Level 10.2: TurboModules & Lazy Loading</Text>
      <Text>Current Status: {moduleStatus}</Text>
      <Button 
        title="Tap to Use Camera (Loads On-Demand) 📷" 
        onPress={handleOpenScanner} 
      />
    </View>
  );
};

export default TurboModuleDemo;
```

---

### 🗣️ Tenglish Explanation:
- **Eager Loading (Old):** App open avvagane anni modules ni load chesi app start ni slow chesthundi.
- **TurboModules Lazy Loading (New):** User feature ni touch chesinappudu mathrame aa specific module ni RAM loki thesthundhi. Deeni valla app startup **10x faster** ga untundi!

---

### 🛠️ Quick Check:
Why do TurboModules make React Native app startup much faster compared to the old architecture?  
👉 *Answer*: **Option B) Because TurboModules use Lazy Loading, initializing native modules only when they are first called instead of loading all of them on app startup.**

---
---

## 🎨 Level 10.3: Fabric Rendering Engine & UI Layout

### 1. The Old 3-Thread Layout Jitter 🐢

```
1. JavaScript Thread  ──▶ Creates React Element Tree (<View />)
        │ (Bridge Queue 🌉)
2. Shadow Thread      ──▶ Yoga C++ calculates width, height & flexbox
        │ (Bridge Queue 🌉)
3. Native UI Thread   ──▶ Android/iOS draws the native view (android.view.View)
```

---

### 2. What is Fabric? (Synchronous C++ Rendering ⚡)

```
[ JavaScript Engine ] ◄── JSI (Direct C++) ──► [ Fabric C++ Core ] ──► [ Native UI Screen ]
                                                (Synchronous Measurement & Zero Flicker! ⚡)
```

- **Synchronous Layout Measurement:** Measure component heights and widths instantly (`measureSync()`) in the exact same frame.
- **Zero UI Jitter:** Eliminates layout jumps when rotating screens or opening keyboards.

---

### 💻 Code Example: Synchronous Layout Measurement with Fabric

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const FabricDemo = () => {
  const [layoutInfo, setLayoutInfo] = useState('Not measured');

  const handleMeasureLayout = () => {
    // ⚡ Synchronous direct measurement in the same frame via Fabric C++
    const measuredWidth = 320;
    const measuredHeight = 150;
    setLayoutInfo(`Width: ${measuredWidth}px, Height: ${measuredHeight}px (Measured synchronously in 0.1ms!)`);
  };

  return (
    <View>
      <Text>Level 10.3: Fabric Rendering Engine</Text>
      <Button 
        title="Measure Box Layout (Fabric Synchronous) 📐" 
        onPress={handleMeasureLayout} 
      />
      <Text>Layout Result: {layoutInfo}</Text>
    </View>
  );
};

export default FabricDemo;
```

---

### 🗣️ Tenglish Explanation:
- **Old Rendering:** 3 threads madhyalo bridge valla layout calculation late ayyi screen flicker and lag vachedi.
- **Fabric (New):** C++ lo direct ga native UI draw chesthundi. Screen rotate chesina, keyboard open chesina **0ms zero-flicker** tho layout render avthundi!

---

### 🛠️ Quick Check:
What is the main improvement that the **Fabric** rendering engine brings to React Native?  
👉 *Answer*: **Option B) It executes layout rendering and measurements directly in C++ via JSI, eliminating asynchronous bridge delays and screen flicker.**

---
---

## 🛡️ Level 10.4: Codegen & Type-Safe Native Interfaces

### 1. The Old Problem: Type-Mismatch App Crashes 💥

```
[ JavaScript Thread ]                       [ Native Java / Swift Code ]
Sends: { age: "twenty" } (String) ──▶ Expects: int age = 20; (Integer)
                                                   │
                                                   ▼
                                          💥 FATAL APP CRASH!
                               (NullPointerException / TypeCastException)
```

---

### 2. What is Codegen? (Automated Type-Safety ⚡)

```
                    ┌──────────────────────────────┐
                    │ 1. You write TypeScript Spec │
                    │    (NativeBatterySpec.ts)    │
                    └──────────────┬───────────────┘
                                   │
                           ⚡ Runs Codegen at Build Time
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ↓                         ↓                         ↓
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ Generates C++   │       │ Generates Java  │       │ Generates Swift │
│ Native Headers  │       │ (Android JNI)   │       │ (iOS Classes)   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

### 💻 Code Example: Type-Safe Native Spec Contract

#### 1. The TypeScript Spec File (`NativeCalculatorSpec.ts`):
```typescript
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): number; // Strict number types!
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCalculator');
```

#### 2. Using it safely in a Component:
```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const CodegenDemo = () => {
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // ⚡ Guaranteed type-safe execution (Generated by Codegen)
    const sum = 10 + 25; // NativeCalculator.add(10, 25);
    setResult(sum);
  };

  return (
    <View>
      <Text>Level 10.4: Codegen Type Safety</Text>
      <Button 
        title="Execute Type-Safe Native Add (10 + 25) ➕" 
        onPress={handleCalculate} 
      />
      {result !== null && (
        <Text>Native Result: {result} (100% Type-Safe ✅)</Text>
      )}
    </View>
  );
};

export default CodegenDemo;
```

---

### 🗣️ Tenglish Explanation:
- **Old System:** JS nunchi wrong type (string instead of number) pampisthe user phone lo app crash aypoyedi.
- **Codegen (New):** Manam TypeScript lo Spec raasthe, Codegen automatic ga C++, Java, Swift code generate chesthundi. Wrong type unte **app build avvadu (compile time error)**, so user phone lo 0% crashes!

---

### 🛠️ Quick Check:
What is the primary benefit of **Codegen** in React Native's New Architecture?  
👉 *Answer*: **Option B) It uses TypeScript specs to generate type-safe native C++, Java, and Swift code at compile time, preventing runtime type-mismatch crashes.**

---

# 🔔 LEVEL 11: Real-Time Push Notifications & Deep Linking

---

## 11.1 — Push Fundamentals & Dual-Layer Token Architecture
- **Push Token**: An address associated with a specific app installation/destination. It can change or expire (reinstall, OS restore).
- **Dual-Layer Architecture**:
  - **Expo Approach**: `App -> Expo Push Token -> Expo Push Service -> APNs/FCM -> Device`
  - **Direct Native**: `App -> Raw APNs/FCM Token -> Apple/Google Direct Cloud -> Device`
- **Display vs Silent Data**: Display notifications show OS banners even if closed; Silent background messages execute JS background code subject to OS battery rules.

---

## 11.2 — The Backend Trigger Pipeline & Sending Push Payloads
- **Trigger Pipeline**: Server event -> Query active token -> HTTP POST `https://exp.host/--/api/v2/push/send` -> APNs/FCM -> Phone.
- **Payload Schema**:
  ```json
  {
    "to": "ExponentPushToken[...]",
    "title": "Order Dispatched! 🛵",
    "body": "Your driver is on the way.",
    "sound": "default",
    "badge": 1,
    "data": { "screen": "OrderTracking", "orderId": "ORD-9821" }
  }
  ```
- **`DeviceNotRegistered`**: When returned by the gateway, the backend must deactivate/delete that token from the database.

---

## 11.3 — Foreground Notification Handling
- **Default Problem**: OS suppresses visual alert banners when the app is already open in the foreground.
- **Fix**: Call `Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true }) })`.
- **`addNotificationReceivedListener`**: Listens for incoming notifications while the app is active to update UI state in real time.

---

## 11.4 — User Interaction & Tap Response Listeners
- **`addNotificationResponseReceivedListener`**: Fires when user taps the notification banner while the app is in the background.
- **`getLastNotificationResponseAsync()`**: Catches cold-start launch when the user taps a lock screen banner while the app is killed.

---

## 11.5 & 11.6 — Deep Linking Connection & Enterprise Pipeline
- **Root `navigationRef`**: Using `createNavigationContainerRef()` enables global navigation from notification tap listeners.
- **Enterprise Synthesis**: Complete hook `usePushNotifications()` managing registration, foreground alerts, cold-start handling, and real-time deep-linking navigation.

---

# 🗄️ LEVEL 12: Offline-First Architecture & Local Databases

---

## 12.1 — SQLite on Mobile & `expo-sqlite`
- **AsyncStorage vs SQLite**: AsyncStorage stores data as a single flat JSON string, requiring the entire dataset to parse into RAM during queries (OOM risk). SQLite stores data in indexed B-Trees on disk, querying individual rows in ~0.5ms with 0% memory overhead.
- **`expo-sqlite` Modern API**: Asynchronous JSI operations (`openDatabaseAsync`, `execAsync`, `runAsync`, `getAllAsync`) using parameterized queries to prevent SQL injections.

---

## 12.2 — WatermelonDB & Observable Lazy-Loading
- **JSI Multithreading**: SQLite runs on a separate native C++ background thread, keeping the JS event loop free.
- **Lazy Loading**: Only instantiates JavaScript model objects for items currently visible in the mobile viewport, scaling to 100,000+ items at 60 FPS.
- **RxJS Observables**: Components subscribe directly to database rows; table updates re-render only the affected UI nodes.

---

## 12.3 — Offline Mutation Queues & Sync Engines
- **Optimistic UI**: Immediately renders the user's action with a pending state indicator (⏳) for instant perceived performance.
- **Persistent Mutation Queue**: Queues HTTP operations locally in SQLite (`url`, `method`, `body`, `status: 0`).
- **NetInfo Auto-Drainer**: Listens for `isConnected === true` to sequentially drain the pending queue, sending requests to the backend and marking records as synced (✅).

---

## 12.4 — Conflict Resolution Strategies
- **Last-Write-Wins (LWW)**: Resolves conflicts using the highest server timestamp (simple, but overwrites older edits).
- **Field-Level Delta Merging**: Merges distinct modified fields if changes do not overlap.
- **CRDTs (Conflict-Free Replicated Data Types)**: Commutative mathematical data structures allowing concurrent offline edits to merge deterministically without data loss (used in Google Docs, Figma, Notion).

---

# 🚀 LEVEL 13: EAS Build Pipeline, Native Credentials & App Store Submissions

---

## 13.1 — EAS Build Cloud Architecture
- **Windows to iOS Problem**: Apple requires native Xcode on macOS to compile `.ipa` binaries.
- **EAS Cloud Solution**: `eas build --platform ios` offloads compilation to managed Apple Silicon Mac server clusters in the cloud, returning finalized `.ipa` links in ~8 minutes.

---

## 13.2 — Android App Bundles (.aab) & Keystore Signing
- **APK vs AAB**: `.apk` bundles all CPU architectures (~50MB). `.aab` enables Google Play Dynamic Delivery to generate lightweight 15MB APKs tailored to each user's device processor.
- **Android Keystore**: The cryptographic digital signature required to publish app updates. EAS Credentials securely encrypts and stores keystores in the cloud.

---

## 13.3 — iOS Certificates & Provisioning Profiles
- **Bundle Identifier**: Unique global app ID registered in Apple Developer Portal.
- **Distribution Certificate**: Cryptographic developer identity passport issued by Apple.
- **Provisioning Profile**: Security permit linking the App ID, certificate, and target devices. EAS automatically generates and configures all 3 assets in 30 seconds.

---

## 13.4 — Multi-Environment Build Matrix & EAS Submit
- **Environment Matrix**: `eas.json` isolates `development` (local), `preview` (staging APK), and `production` (App Store / Play Store) configurations.
- **Secret Management**: Private keys stored securely in Expo Cloud Secret Vault (`eas secret:create`).
- **EAS Submit**: Automated CLI store deployment via `eas submit --platform all`.

---

# ⚡ LEVEL 14: Over-The-Air (OTA) Live Updates & Runtime Versioning

---

## 14.1 — What is an OTA Update?
- **Instant Live JS Updates**: React Native decouples native binary shells from the JavaScript bundle (`index.bundle`). While native binary updates require 2-3 days of store review queues, JS logic, UI screens, and styles can be updated over-the-air in ~5 seconds via `eas update`.
- **`expo-updates` API**: Provides programmatic update checks (`checkForUpdateAsync`, `fetchUpdateAsync`, `reloadAsync`).

---

## 14.2 — Apple & Google Store Legal Policies
- **Legal Scope (Allowed)**: Bug fixes, UI improvements, design styling, and business logic updates are 100% permitted under Apple Guideline 2.5.2 & Google Play policies.
- **Strictly Prohibited (Banned)**: Altering core app purpose/category (e.g. converting a utility app into a real-money gambling casino) or bypassing native in-app purchase (IAP) digital billing rules results in permanent developer account termination.
- **Native Boundary**: Adding new native C++/Java/Swift modules cannot be delivered via OTA and mandates a full binary release.

---

## 14.3 — Runtime Versioning & Native Compatibility Locks
- **The Mismatch Problem**: Executing new JavaScript that references non-existent native C++ modules on older user binaries causes fatal app startup crashes.
- **`runtimeVersion` Lock**: Cryptographically couples OTA updates to the exact matching native binary fingerprint (`appVersion` or `fingerprint` policy), ensuring older clients ignore incompatible updates.

---

## 14.4 — Emergency Rollbacks, Channels & Canary Releases
- **Deployment Channels**: Isolating updates between `preview` (QA team) and `production` (live app stores).
- **Emergency 1-Second Rollback**: `eas update:republish --group-id <stable-group-id>` instantly reverts all production clients to the last known stable bundle.
- **Canary Rollouts**: Phasing deployments (10% ➔ 100%) while monitoring crash telemetry in Sentry/Datadog.









