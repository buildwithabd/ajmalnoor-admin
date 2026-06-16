import { Text as RNText, TextProps } from "react-native";

export function TextMono({ className, ...props }: TextProps) {
  return <RNText className={`font-mono ${className ?? ""}`} {...props} />;
}
