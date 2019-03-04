import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]],
      currentPlayer: 1
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState:
        [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]],
        currentPlayer: 1
    })
  }

  getWinner = () => {
    let arr = this.state.gameState.slice();
    let sum;

    // CHECK ROWS
    for (let i = 0; i < 3; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        alert('Player X Won!');
        this.initializeGame();
      }
      if (sum == -3) {
        alert('Player O Won!');
        this.initializeGame();
      }
    }

    // CHECK COLUMNS
    for (let i = 0; i < 3; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        alert('Player X Won!');
        this.initializeGame();
      }
      if (sum == -3) {
        alert('Player O Won!');
        this.initializeGame();
      }
    }

    // CHECK DIAGNOLAS

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      alert('Player X Won!');
      this.initializeGame();
    }
    if (sum == -3) {
      alert('Player O Won!');
      this.initializeGame();
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == 3) {
      alert('Player X Won!');
      this.initializeGame();
    }
    if (sum == -3) {
      alert('Player O Won!');
      this.initializeGame();
    }
  }

  onTilePress = (row, col) => {
    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();

    if (arr[row][col] != 0) {
      alert("Tile already selected");
    }
    else {
      arr[row][col] = currentPlayer;
      this.setState({ gameState: arr, currentPlayer: this.state.currentPlayer * -1 });
      this.getWinner();
    }
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon style={styles.tileO} name="circle-outline" />;
      default:
        return <View />
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]} >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]} >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile} >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]} >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tileX: {
    fontSize: 60,
    color: 'red'
  },

  tileO: {
    fontSize: 60,
    color: 'green'
  }
});
