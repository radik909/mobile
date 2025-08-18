# Required Knowledge

## Layouts and views

You don't need to manually adjust <View> styling properties based on locale. You can use properties like justifyContent, alignItems, and others. Their property values change behavior as required.

- On LTR locales, start and end are the same as left and right.
- On RTL locales, start and end are the same as right and left.

## Text alignment

The React Native's textDirection property does not accept `start` or `end` values that you can use in flex properties. Instead, `left` effectively works as start (aligns to the left on LTR and the right on RTL), and `right` works as end.

However, the default unset value of textDirection property signifies the actual left (aligns to the left both on LTR and RTL). This means each <Text> tag should have the textDirection: left or textDirection: right style set if you want it to be aligned correctly.

It's best to define this style in your custom reusable <Text> component that you can then import everywhere you need to render text strings.
