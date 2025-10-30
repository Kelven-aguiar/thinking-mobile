import { View } from 'react-native';

export const customEvents = {
  '2025-10-30': {
    customContent: (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'red',
            marginTop: 2,
          }}
        />
      </View>
    ),
    marked: true,
    dotColor: 'red',
  },
};
