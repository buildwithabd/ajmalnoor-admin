import { TextInput as RNTextInput, TextInputProps } from "react-native";

export function TextInput({ className, ...props }: TextInputProps) {
  return (
    <RNTextInput
      className={`font-dmMedium text-2xl ${className ?? ""}`}
      {...props}
    />
  );
}
