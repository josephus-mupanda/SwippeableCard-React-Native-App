import React, { useRef, useState } from 'react';
import { View, Animated, PanResponder, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CardStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const cards = [
    { id: 1, text: 'Card 1', backgroundColor: '#FFC107' },
    { id: 2, text: 'Card 2', backgroundColor: '#E91E63' },
    { id: 3, text: 'Card 3', backgroundColor: '#2196F3' },
  ];

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          swipeRight();
        } else if (gesture.dx < -120) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: 500, y: 0 },
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      resetPosition();
    });
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -500, y: 0 },
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      resetPosition();
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const handleLike = () => {
    swipeRight();
  };

  const handleDislike = () => {
    swipeLeft();
  };

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        if (index < currentIndex) {
          return null;
        } else if (index === currentIndex) {
          return (
            <Animated.View
              key={card.id}
              {...panResponder.panHandlers}
              style={[styles.card, getCardStyle(), { backgroundColor: card.backgroundColor }]}
            >
              <Text style={styles.cardText}>{card.text}</Text>
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={handleDislike}>
                  <Text style={styles.actionButtonText}>Dislike</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                  <Text style={styles.actionButtonText}>Like</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={card.id}
              style={[styles.card, { opacity: 0, backgroundColor: card.backgroundColor }]}
            >
              <Text style={styles.cardText}>{card.text}</Text>
            </Animated.View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default CardStack;

