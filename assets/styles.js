import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    layout:{
        margin: 16,
        gap: 56
    },

    flex:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },


    inputContainer:{
        borderColor: "#C4C7C7",
        borderWidth: 1.5,
        padding: 16,
        height: 56, 
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center"

    },

    input_error:{
        borderColor: '#ff00000',
        borderWidth: 1,
        padding: 16,
        height: 56, 
        borderRadius: 8
    },

    place_holder_txt:{
        fontSize: 14,
        fontWeight: '400',
        color: '#D3D3D3',

    },

    input_title:{
        fontSize: 16,
        fontWeight: '600',
    },

    error_text:{
        color: '#FF0000',
        fontSize: 12
    },
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})