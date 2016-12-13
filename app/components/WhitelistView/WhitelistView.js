/**
 * Name: WhitelistView
 * Author: Chrissprance
 * Creation Date: 12/11/2016
 * Description: Contains the list of all the whitelisted players on the server
 *              and the logic to add remove and filter them
 */
import React, {Component} from 'react';

import styled, {keyframes} from 'styled-components';
import store from 'store';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import AddIcon from 'material-ui/svg-icons/content/add';
import fuzzy from 'fuzzy';
import Snackbar from 'material-ui/Snackbar';

import Spacer from '../common/Spacer';

import {sendCommandToServer} from '../../utils/sendCommandToServer';
import {log} from '../../utils/loggerUtils';
import {white, darkGrey, black} from '../../styles/colors';
import PlayerCard from '../PlayersView/PlayerCard';



export default class WhitelistView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      credentials: store.get('userCredentials'),
      players: [{name: 'MenisHead Johnson', steam: '324754783294234'}, {name: 'ClickMouth Frankhead', steam: '34234546435345'}],
      searchString: '',
      showWhitelistDialog: false,
      whitelistDialogSteamID: '',
      showSnackBar: false,
      snackBarMsg: ''
    };
  }

  componentWillMount() {
    // Go and grab the player list from the server.
    this.getPlayersAndAddToState();
  }

  getPlayersAndAddToState = () => {
    this.setState({
      loading: true,
    });
  };

  snackBar = (msg) => {
    this.setState({
      showSnackBar: true,
      snackBarMsg: msg
    });
  };


  addPlayerToWhitelist = () => {
    //this.state.whitelistDialogSteamID

  };

  removePlayerFromWhitelist = (steam) =>{


  };

  showWhitelistDialog = (steam) => {
    this.setState({
      showWhitelistDialog: true,
      whitelistDialogSteamID: steam
    })
  };

  hideWhitelistDialog = () => {
    this.setState({
      showWhitelistDialog: false
    })
  };

  updateSearchString = (e) => {
    this.setState({
      searchString: e.target.value
    });
  };

  closeSnackBar = () => {
    this.setState({
      showSnackBar: false
    });
  };


  render() {
    const fuzzyList = fuzzy.filter(this.state.searchString, this.state.players, {extract: (el) => el.name}).map((el) => el.string);
    const filterList = this.state.players.filter((player) => fuzzyList.indexOf(player.name) >= 0);
    return (
      <Container>
        <Actions>
          <Spacer />
          <FloatingActionButton onTouchTap={this.addPlayerToWhitelist} secondary={true}>
            <AddIcon />
          </FloatingActionButton>
          <Spacer />
          <SearchBar
            value={this.state.searchString}
            onChange={this.updateSearchString}
            style={{flex: 4}}
            floatingLabelStyle={{color: white}}
            floatingLabelText="Search...."
          />
          <Spacer />
          <FloatingActionButton onTouchTap={this.getPlayersAndAddToState} secondary={true}>
            { (this.state.loading === true ? <AnimatedRefresh /> : <RefreshIcon />) }
          </FloatingActionButton>
          <Spacer />
        </Actions>
        <PlayerList>
          {filterList.map((player) =>
            <PlayerCard
              key={player.steam + player.name}
              steam={player.steam}
              name={player.name}
              removePlayerFromWhitelist={this.removePlayerFromWhitelist}
            />)}
        </PlayerList>
        <Snackbar
          bodyStyle={{background: darkGrey}}
          open={this.state.showSnackBar}
          message={this.state.snackBarMsg}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackBar}
          action="OK"
          onActionTouchTap={this.closeSnackBar}
        />
      </Container>
    );
  }
}


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedRefresh = styled(RefreshIcon)`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
`;

const SearchBar = styled(TextField)`
  width: 40%;
`;

const Actions = styled.div`
  height: 100px;
  width: 100%;
  display: flex; 
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
  flex-shrink: 1;
`;

const PlayerList = styled.div`  
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 10px;
  overflow-y: auto;
  align-items: flex-start;
  justify-content: center;
`;

