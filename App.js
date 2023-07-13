import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const SettingsScreen = () => {

  const handleYup = (card) => {
    console.log("Swiped right!");
    // Handle right swipe action here
  };

  const handleNope = (card) => {
    console.log("Swiped left!");
    // Handle left swipe action here
  };

  const Card = ({ card }) => (
    <View style={styles.card}>
      <Image source={card.image} style={styles.cardImage} />
      <Text style={styles.cardName}>{card.name}</Text>
    </View>
  );

  const renderNoMoreCards = () => (
    <View style={styles.noMoreCards}>
      <Text>No more cards</Text>
    </View>
  );

  const handleSwipeLeft = () => {
    swipeCard('left');
  };

  const handleSwipeRight = () => {
    swipeCard('right');
  };

  const swipeCard = (direction) => {
    // Swipe the top card programmatically
    if (cards.length > 0) {
      const newCards = [...cards];
      newCards.shift(); // Remove the top card
      setCards(newCards);
      if (direction === 'left') {
        handleNope(cards[0]);
      } else if (direction === 'right') {
        handleYup(cards[0]);
      }
    }
  };

  const [cards, setCards] = useState([
    { id: 1, name: 'Card 1', image: require('./images/image1.jpg') },
    { id: 2, name: 'Card 2', image: require('./images/image2.jpg') },
    { id: 3, name: 'Card 3', image: require('./images/image3.jpg') },
    { id: 4, name: 'Card 4', image: require('./images/image4.jpg') },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipeable Cards</Text>
      <SwipeCards
        cards={cards}
        renderCard={(cardData) => <Card card={cardData} />}
        renderNoMoreCards={renderNoMoreCards}
        handleYup={handleYup}
        handleNope={handleNope}
        showYup={false}
        showNope={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noMoreCards: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    color:'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default SettingsScreen;

