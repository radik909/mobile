/* eslint-disable no-restricted-imports */
import { Text as RNText, TextProps } from 'react-native';
import { cssInterop } from 'nativewind';
import { tv } from 'tailwind-variants';

// Define typography variants
const textVariants = tv({
  base: 'text-gray-800', // base style
  variants: {
    variant: {
      title: 'font-helveticaMedium text-3xl',
      subtitle: 'font-helvetica text-xl text-gray-600',
      body: 'font-helvetica text-base',
      caption: 'font-helvetica text-sm text-gray-500',
      button: 'font-helveticaMedium text-base uppercase tracking-wide text-white',
    },
  },
  defaultVariants: {
    variant: 'body', // 👈 default
  },
});

interface AppTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'button';
  className?: string;
}

const StyledText = cssInterop(RNText, { className: 'style' });

export function CText({ variant, className, ...props }: AppTextProps) {
  return <StyledText className={textVariants({ variant, className })} {...props} />;
}
