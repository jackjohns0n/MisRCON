import Button from '@material-ui/core/Button';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteAllPlayers } from '../../../redux/players/actions';
import SettingsDialogSettingBox from './SettingsDialogSettingBox';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;
const AlignLeft = styled.div`
  width: 100%;
  justify-content: left;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  padding: 5px;
`;

interface Props {}
const StateSettingsSection: React.FunctionComponent<Props> = ({}) => {
  const dispatch = useDispatch();
  const deletePlayers = () => dispatch(deleteAllPlayers());
  return (
    <Wrapper>
      <AlignLeft>State</AlignLeft>
      <SettingsDialogSettingBox
        name={'Clear Players'}
        description={
          <p>
            Delete all internal Players application state. This is helpful for
            when player are not showing up correctly or missing avatars.
          </p>
        }
      >
        <Button
          onClick={deletePlayers}
          color={'secondary'}
          variant={'contained'}
        >
          Clear Players
        </Button>
      </SettingsDialogSettingBox>
      <SettingsDialogSettingBox
        name={'Fetch on Server Select'}
        description={
          <p>
            Should the application fetch the data from the server upon selecting
            a Server Avatar or should we only fetch data when the user asks for
            it.
          </p>
        }
      >
        <Button
          onClick={deletePlayers}
          color={'secondary'}
          variant={'contained'}
        >
          Clear Players
        </Button>
      </SettingsDialogSettingBox>
    </Wrapper>
  );
};

export default StateSettingsSection;
