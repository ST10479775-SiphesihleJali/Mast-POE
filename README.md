# Christoffel's Kitchen - Menu Management App

A cross-platform mobile application built with React Native for private chef Christoffel to manage his dynamic menu offerings.

##  App Features

- ✅ Add menu items (dish name, description, course, price)
- ✅ Remove menu items from the menu
- ✅ View complete menu on home screen
- ✅ Display total number of dishes
- ✅ Display average price per course (Starters, Mains, Desserts)
- ✅ Filter menu items by course
- ✅ Data persistence using AsyncStorage
- ✅ Smooth animations and transitions
- ✅ Dark theme UI with professional design

##  Technology Stack

- **Framework**: React Native
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack Navigator)
- **Storage**: AsyncStorage
- **UI Components**: React Native Core Components
- **Picker**: @react-native-picker/picker

---

##  CHANGELOG - Changes Since Part 2

### **Major Features Added**

#### 1. **Average Price Calculation by Course** 
- **File**: `HomeScreen.tsx`
- **What Changed**: Added `calculateAverages()` function that calculates the average price for each course
- **Implementation Details**:
  - Used **for loop** to iterate through courses array
  - Used **while loop** to sum up prices for items in each course
  - Displays average price breakdown in a styled card on home screen
  - Shows count of items per course
  - Handles empty courses gracefully (displays "No items")
- **Why**: Required feature for final PoE - allows chef to see pricing strategy at a glance

#### 2. **Filter Menu Screen** 
- **Files Added**: `FilterScreen.tsx` (new file)
- **What Changed**: Created completely new screen for filtering menu items
- **Implementation Details**:
  - Used **for...in loop** to iterate through menu items during filtering
  - Filter buttons for: All, Starters, Mains, Desserts
  - Active filter highlighted with blue background
  - Shows filtered count (e.g., "Showing 3 starters")
  - Read-only view (no delete functionality on filter screen)
  - Empty state when no items match filter
- **Navigation**: Added "Filter Menu" button on HomeScreen
- **Why**: Required feature for final PoE - allows guests to view specific course categories

#### 3. **Data Persistence with AsyncStorage** 
- **File**: `App.tsx`
- **What Changed**: Integrated AsyncStorage to save menu items permanently
- **Implementation Details**:
  - Items load automatically when app starts
  - Items save automatically whenever menu changes
  - Uses try-catch for error handling
  - Storage key: `@menu_items`
- **Why**: Prevents data loss when app closes

#### 4. **Separate Add Item Screen** 
- **Status**: Already completed in Part 2
- **Confirmation**: AddItemScreen is on separate screen (not on homepage)
- **Features**: Full validation, image URL support, course picker

---

### **Code Quality Improvements (Refactoring)**

#### 1. **Type Safety Enhancements** 
- **File**: `App.tsx`
- **What Changed**: 
  - Created `CourseType` type: `'Starters' | 'Mains' | 'Desserts'`
  - Updated `MenuItem` interface to use `CourseType` instead of generic string
  - Added `CourseAverage` type in HomeScreen for type-safe average calculations
- **Why**: Prevents typos and ensures only valid courses are used throughout the app

#### 2. **Improved ID Generation** 
- **File**: `AddItemScreen.tsx`
- **What Changed**: Changed from `Date.now().toString()` to `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
- **Why**: Prevents ID collisions if multiple items added quickly

#### 3. **Input Validation & Sanitization** 
- **File**: `AddItemScreen.tsx`
- **What Changed**:
  - Added `.trim()` to all text inputs before validation
  - Added price validation (checks for NaN, negative values)
  - Added `isValidUrl()` helper function to validate image URLs
  - Improved error messages with specific guidance
- **Why**: Prevents invalid data entry and improves data quality

#### 4. **Animation Cleanup** 
- **File**: `MenuItemCard.tsx`
- **What Changed**:
  - Added return statement in useEffect to stop animations on unmount
  - Fixed missing dependencies in useEffect `[fadeAnim, slideAnim, index]`
  - Fixed missing dependency in HomeScreen's useFocusEffect `[fadeAnim]`
- **Why**: Prevents memory leaks and React warnings

#### 5. **Extracted Magic Numbers to Constants** 
- **File**: `MenuItemCard.tsx`
- **What Changed**: Created `ANIMATION_CONFIG` object with `DURATION: 600` and `STAGGER_DELAY: 150`
- **Why**: Makes animation timing easier to adjust and more maintainable

#### 6. **Platform-Specific Styling** 
- **File**: `MenuItemCard.tsx`
- **What Changed**: Added `Platform.select()` for shadows (iOS) vs elevation (Android)
- **Why**: Better native appearance on each platform

#### 7. **Improved Currency Formatting** 
- **Files**: `MenuItemCard.tsx`, `HomeScreen.tsx`
- **What Changed**: Using `toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`
- **Why**: Consistent decimal places and proper South African formatting

#### 8. **Accessibility Improvements** 
- **Files**: All screen components
- **What Changed**: Added accessibility labels, roles, and hints to all TouchableOpacity buttons
- **Example**: `accessibilityLabel="Delete dish"`, `accessibilityRole="button"`
- **Why**: Makes app usable for users with screen readers

#### 9. **Empty State Handling** 
- **Files**: `HomeScreen.tsx`, `FilterScreen.tsx`
- **What Changed**: Added `ListEmptyComponent` to FlatLists with helpful messages
- **Why**: Better user experience when no items exist

#### 10. **Error Handling for Images** 
- **File**: `MenuItemCard.tsx`
- **What Changed**: Added `onError` handler to Image component
- **Why**: Gracefully handles broken image URLs

#### 11. **Removed Unused Props** 
- **File**: `App.tsx`, `HomeScreen.tsx`
- **What Changed**: Removed `addItem` prop from HomeScreen (wasn't being used)
- **Why**: Cleaner code, prevents confusion

#### 12. **Function Organization** 
- **What Changed**: 
  - Created helper functions: `calculateAverages()`, `getFilteredItems()`, `isValidUrl()`
  - Each function has single responsibility
  - Functions use appropriate loop types (for, while, for...in)
- **Why**: Better code organization and reusability

---

##  Loop Usage (Required for PoE)

The app demonstrates all three loop types as required:

### 1. **for loop**
- **Location**: `HomeScreen.tsx` - `calculateAverages()` function
- **Purpose**: Iterates through course types array to calculate averages
```typescript
for (let i = 0; i < courses.length; i++) {
  const course = courses[i];
  // Calculate average for each course
}
```

### 2. **while loop**
- **Location**: `HomeScreen.tsx` - `calculateAverages()` function
- **Purpose**: Sums up prices for items in each course
```typescript
while (j < courseItems.length) {
  totalPrice += courseItems[j].price;
  count++;
  j++;
}
```

### 3. **for...in loop**
- **Location**: `FilterScreen.tsx` - `getFilteredItems()` function
- **Purpose**: Iterates through menu items object to filter by course
```typescript
for (const index in menuItems) {
  const item = menuItems[index];
  if (item.course === selectedCourse) {
    filteredItems.push(item);
  }
}
```

---

##  File Structure

```
christoffels-kitchen/
├── App.tsx                          # Main app component with navigation
├── screens/
│   ├── WelcomeScreen.tsx           # Landing page
│   ├── HomeScreen.tsx              # Main menu display with averages
│   ├── AddItemScreen.tsx           # Form to add new dishes
│   └── FilterScreen.tsx            # Filter menu by course (NEW)
├── components/
│   └── MenuItemCard.tsx            # Reusable menu item card component
└── README.md                        # This file
```

---

##  Requirements Checklist

### Part 2 Requirements
- ✅ Chef can enter dish name, description, course, price
- ✅ Predefined course list (Starters, Mains, Desserts)
- ✅ Home screen displays complete menu
- ✅ Home screen shows total number of dishes
- ✅ Data stored in array (useState)

### Final PoE Requirements
- ✅ Average price per course displayed on home screen
- ✅ Separate screen for adding items (not on homepage)
- ✅ Chef can remove items from menu
- ✅ Menu items saved in array
- ✅ Filter screen to view specific courses
- ✅ Used for loop
- ✅ Used while loop
- ✅ Used for...in loop
- ✅ Defined multiple functions
- ✅ Code organized in multiple files
- ✅ Refactored for better quality

---

##  Design Decisions

### Color Scheme
- **Background**: `#121212` (Dark)
- **Cards**: `#1E1E1E` (Slightly lighter dark)
- **Primary**: `#1E90FF` (Dodger Blue)
- **Secondary**: `#FF6B35` (Orange for filter button)
- **Success**: `#4CAF50` (Green for prices)
- **Danger**: `#FF4444` (Red for delete)

### Typography
- **Headers**: 24-28px, bold, white
- **Body**: 14-16px, regular, white/gray
- **Prices**: Bold, formatted with R currency symbol

### Navigation Flow
```
Welcome Screen
      ↓
  Home Screen ← → Add Item Screen
      ↓
 Filter Screen
```

---

##  Installation & Setup

```bash
# Install dependencies
npm install

# Install required packages
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-picker/picker
npm install @react-native-async-storage/async-storage

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios
```

---

##  Video Demonstration

https://youtube.com/shorts/PfTD514BwaY?si=Uwe7mUS5Dgn2G62o

- Adding menu items
- Viewing complete menu
- Deleting items
- Average price calculation
- Filtering by course
- Data persistence]

---

##  Code Attribution

All external code, libraries, and resources have been properly attributed in the source files with:
- Author/Source
- Title/Description
- Publication Date
- URL
- Access Date
- Purpose of use

---

##  License

This project was created as a Portfolio of Evidence for educational purposes.

---

##  Student Information

**Student Name**: Siphesihle Jali  
**Student Number**: ST10479775  
**Course**: Mobile App Scripting 
**Submission Date**: 12/11/2025
