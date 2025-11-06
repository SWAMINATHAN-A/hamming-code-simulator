# Manual Bit Flip Feature - Implementation Documentation

## Overview
This document describes the implementation of the manual bit flip feature added to the Hamming Code Simulator. This enhancement allows users to manually specify which bit position to flip in addition to the existing random bit flip functionality.

## Changes Made

### 1. New Utility Function (`hammingUtils.ts`)

#### `simulateManualError(codeword: string[], position: number)`
A new function that simulates a single-bit error at a user-specified position.

**Parameters:**
- `codeword`: The original codeword array
- `position`: The 0-indexed position to flip

**Returns:**
- An object with `{ codeword, errorPosition }` if successful
- `null` if the position is invalid

**Features:**
- Validates position range (0 to codeword.length - 1)
- Flips the bit at the specified position (0 → 1 or 1 → 0)
- Returns a new array without mutating the original

**Example:**
```typescript
const result = simulateManualError(['1', '0', '1', '0'], 2);
// Returns: { codeword: ['1', '0', '0', '0'], errorPosition: 2 }
```

### 2. EncoderPanel Updates

#### New State Variable
```typescript
const [manualBitPosition, setManualBitPosition] = useState<string>('');
```
Stores the user's input for manual bit position selection.

#### New Handler Function: `handleManualBitFlip()`
Handles manual bit flip with comprehensive validation:

**Validation Steps:**
1. Checks if a codeword exists
2. Validates numeric input (NaN check)
3. Converts 1-indexed user input to 0-indexed array position
4. Validates position range (1 to codeword.length)
5. Provides user-friendly error messages via alerts

**Features:**
- Detailed step logging for manual errors
- Automatic input field clearing after successful flip
- Distinguishes manual errors from random errors in the log

#### UI Enhancement
Replaced the single "Simulate Transmission Error" button with a responsive layout:

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│  [Random Bit Flip Button]  [Input] [Manual Button]  │
│  💡 Helper text explaining both options             │
└─────────────────────────────────────────────────────┘
```

**Components:**
1. **Random Bit Flip Button** (left side)
   - Maintains original random error functionality
   - Full width on mobile, flex-1 on larger screens
   - Icon: Zap (⚡)

2. **Manual Bit Flip Controls** (right side)
   - Number input field (width: 80px)
     - Min: 1, Max: codeword.length
     - Placeholder shows valid range dynamically
     - Keyboard support: Enter key triggers flip
   - Manual Bit Flip button
     - Disabled when no input or error already simulated
     - Auto-enables when valid position entered

3. **Helper Text**
   - Displays valid range (1 to codeword.length)
   - Shows helpful emoji icon
   - Hidden after error is simulated

## Dark Mode Support

All new UI elements fully support dark mode:

### Color Schemes

**Input Field:**
- Light mode: White background, gray border, dark text
- Dark mode: Dark background (#2a2a2a), gray border, golden text (#FFB300)

**Buttons:**
- Both modes use golden accent color (#FFB300)
- Hover states provide 10% opacity overlay
- Consistent with existing UI theme

**Helper Text:**
- Light mode: 70% opacity dark text
- Dark mode: 70% opacity golden text

## Accessibility Features

### Keyboard Navigation
- Input field supports Enter key to trigger flip
- All buttons are keyboard-focusable (default browser behavior)
- Tab order: Random button → Input field → Manual button

### Screen Reader Support
- `aria-label` on random button: "Simulate random transmission error"
- `aria-label` on input: "Enter bit position to flip (1-indexed)"
- `aria-label` on manual button: "Flip bit at specified position"

### Visual Clarity
- Clear placeholder text showing valid range
- Disabled states clearly indicated
- Helper text provides context
- Error messages use alert() for immediate feedback

## User Experience Improvements

### Input Validation
1. **Empty Input**: Manual button stays disabled
2. **Non-numeric Input**: Alert with clear message
3. **Out of Range**: Alert specifies valid range
4. **Valid Input**: Immediate feedback, input cleared after success

### State Management
- Both buttons share the same `errorSimulated` state
- Once error is introduced (either method), both options disabled
- Maintains single-error constraint for educational clarity

### Responsive Design
- **Mobile (< 640px)**: Stacks vertically
  - Random button full width
  - Manual controls full width below
- **Desktop (≥ 640px)**: Side-by-side layout
  - Equal space allocation (flex-1)
  - Compact input (80px fixed)

## Integration Notes

### No Breaking Changes
- Existing random error functionality unchanged
- Same error detection/correction flow
- Compatible with existing DetailedStepLog system

### Modular Code
- New function isolated in utils file
- Handler follows existing patterns
- Easy to extend for future enhancements

### Detailed Logging
Both error types create comprehensive logs:
- **Random Error**: "Error Simulation" step
- **Manual Error**: "Manual Error Simulation" step (distinguishable)
- Both log: position, bit flip details, next steps

## Testing Recommendations

### Manual Testing Checklist
- [ ] Random bit flip still works
- [ ] Manual bit flip with valid position
- [ ] Manual bit flip with position 1 (boundary)
- [ ] Manual bit flip with max position (boundary)
- [ ] Manual bit flip with position 0 (invalid)
- [ ] Manual bit flip with position > max (invalid)
- [ ] Manual bit flip with non-numeric input
- [ ] Enter key in input field triggers flip
- [ ] Dark mode styling correct for all elements
- [ ] Mobile responsive layout works
- [ ] Desktop side-by-side layout works
- [ ] Both buttons disabled after error
- [ ] Helper text visibility correct
- [ ] Error alert appears in DecodePanel

### Edge Cases Covered
- Empty input → button disabled
- NaN input → validation alert
- Negative position → validation alert
- Position too large → validation alert
- No codeword exists → early return
- Error already simulated → buttons disabled

## Future Enhancement Ideas

1. **Visual Position Selector**: Click on bit visualization to select position
2. **Multiple Errors**: Allow users to introduce multiple errors
3. **Error History**: Track and display all errors introduced
4. **Undo Functionality**: Reset to pre-error state
5. **Preset Error Patterns**: Common error scenarios for learning
6. **Animation**: Highlight the bit being flipped with animation

## Code Quality

### Documentation
- JSDoc comments on new functions
- Inline comments for complex logic
- Comprehensive validation messages

### Best Practices
- Immutable state updates
- Input sanitization
- Graceful error handling
- Consistent naming conventions
- Follows React hooks patterns

### Performance
- No unnecessary re-renders
- Efficient state management
- Minimal DOM updates

## Summary

This feature successfully adds manual bit flip functionality while:
✅ Preserving all existing functionality
✅ Maintaining consistent UI/UX
✅ Supporting dark mode completely
✅ Ensuring full accessibility
✅ Providing clear user feedback
✅ Following project patterns and standards

The implementation is production-ready, well-documented, and easily maintainable.

