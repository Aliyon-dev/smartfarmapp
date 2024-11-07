import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

export const TypewriterText = ({title}) => {
  const [text, setText] = useState('');
  const fullText = title;
  const [index, setIndex] = useState(0);
  const cursorOpacity = useState(new Animated.Value(0))[0];

  // Cursor blinking animation
  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    blinkAnimation.start();

    return () => blinkAnimation.stop();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100); // Adjust speed here

      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <Animated.Text
          style={[
            styles.cursor,
            {
              opacity: cursorOpacity,
            },
          ]}>
          |
        </Animated.Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: '#615DFF',
      fontSize: 28,
      fontFamily: 'monospace',
      fontWeight:'800',
      textAlign: 'center'
    },
    cursor: {
      color: 'white',
      fontSize: 24,
      fontFamily: 'monospace',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 30,
      gap: 10,
    },
    button: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
    },
  });
  