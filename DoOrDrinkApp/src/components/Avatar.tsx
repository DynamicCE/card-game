import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors } from '../utils/Colors';

interface AvatarProps {
  size?: number;
  name?: string;
  imageUri?: string;
  backgroundColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 50,
  name,
  imageUri,
  backgroundColor = Colors.primary,
}) => {
  // İsimden baş harfleri al
  const getInitials = (name?: string) => {
    if (!name) return 'DD';
    
    const parts = name.split(' ');
    if (parts.length === 1) return name.substring(0, 2).toUpperCase();
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: size / 2.5,
            },
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default Avatar; 