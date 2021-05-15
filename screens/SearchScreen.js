import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import db from '../config';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import { SearchBar, Header } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      search: '',
    };
  }

  fetchMoreTransactions = async () => {
    var text = this.state.search.toUpperCase();
    var enteredText = text.split('');

    if (enteredText[0].toUpperCase() === 'D') {
      const query = await db
        .collection('transaction')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredText[0].toUpperCase() === 'S') {
      const query = await db
        .collection('transaction')
        .where('studentId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  componentDidMount = async () => {
    const query = await db.collection('transaction').limit(10).get();
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [],
        lastVisibleTransaction: doc,
      });
    });
  };

  searchTransactions = async (text) => {
    var enteredText = text.split('');

    if (enteredText[0].toUpperCase() === 'D') {
      const transaction = await db
        .collection('transaction')
        .where('bookId', '==', text)
        .get();
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredText[0].toUpperCase() === 'S') {
      const transaction = await db
        .collection('transaction')
        .where('studentId', '==', text)
        .get();
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaProvider>
          <Header
            centerComponent={{
              text: 'Willy App',
              style: { color: 'white', fontWeight: '900', fontSize: 25 },
            }}
            containerStyle={{
              backgroundColor: 'black',
              borderRadius: 10,
              height: 60,
            }}
          />
        </SafeAreaProvider>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.bar}
            placeholder="Enter Book Id Or Student Id"
            onChangeText={(text) => {
              this.setState({ search: text });
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.searchTransactions(this.state.search);
            }}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allTransactions}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 2,
                height: 120,
                width: '100%',
                borderWidth: 5,
                borderColor: 'pink',
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 10,
                backgroundColor: 'white',
                alignSelf: 'stretch',
                margin: 8,
              }}>
              <Text style={{ fontSize: 20, fontWeight: '900', marginLeft: 5 }}>
                {'Student Id: ' + item.studentId}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '700', marginLeft: 5 }}>
                {'Book Id: ' + item.bookId}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '700', marginLeft: 5 }}>
                {'Transaction Type: ' + item.transactionType}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '700', marginLeft: 5 }}>
                {'Date: ' + item.date.toDate()}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    borderWidth: 0.5,
    alignItems: 'center',

    backgroundColor: 'white',
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
