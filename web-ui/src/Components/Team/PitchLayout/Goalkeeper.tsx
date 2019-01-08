import * as React from 'react';
import '../../../Style/Team/PitchLayout/Goalkeeper.css';
import Player from './Player';

class Goalkeeper extends React.Component<{}, {}> {
  render() {
    return (
      <div className="goalkeeper-columns">
        <div className="goalkeeper">
          <Player firstName="Sergio" surname="Aguero" points={23} />
        </div>
      </div>
    );
  }
}
export default Goalkeeper;
