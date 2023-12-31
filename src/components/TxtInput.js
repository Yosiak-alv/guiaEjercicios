import { TextInput } from "react-native";

export const TxtInput = ({ placeholder, passEntry ,onChangeText, value}) => {

    return (
        <TextInput
            className="w-full h-12 px-4 mb-4 bg-blueC-500  border-blueC-400 focus:border-grayC-500 focus:ring-grayC-500
            rounded-lg shadow-sm p-2.5 text-gray-200"
            placeholderTextColor="#E0E0E0"
            placeholder={placeholder}
            secureTextEntry={passEntry}
            onChangeText={onChangeText}
            value={value}
        />
    );
}