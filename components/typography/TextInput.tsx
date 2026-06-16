import { TextInput as RNTextInput, TextInputProps } from "react-native";

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <RNTextInput
      className={`font-DMSans-Medium text-2xl ${className ?? ""}`}
      {...props}
    />
  );
}
