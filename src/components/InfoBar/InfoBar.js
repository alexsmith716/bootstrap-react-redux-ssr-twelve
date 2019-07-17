import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { load } from '../../redux/modules/info';

@connect(
  (state) => ({ info: state.info.data }),
  { load }
)

class InfoBar extends Component {

  static propTypes = {
    // info: PropTypes.shape({
    //   // value: `${v}`,
    //   // timeElapsed: timeElapsedModule1.getSecondsElapsed(),
    //   // time: timeElapsedModule1.getSecondsElapsed(),
    //   // delay: `${delay}`,
    //   // message: 'RESOLVED! This came from the mock API.'
    // }),
    load: PropTypes.func.isRequired
  };

  static defaultProps = {
    info: null
  };

  render() {

    const { info, load } = this.props;
    const styles = require('./scss/InfoBar.scss');

    return (

      <div className="container">

        <div className={`${styles.infoBar} card text-center`}>

          <div className="card-body bg-light">

            <h5 className="card-title">InfoBar message: '<span className={styles.message}>{info ? info.message : 'no message!'}</span>'</h5>

            <h6 className="card-text">{info && new Date(info.time).toString()}</h6>

            <h6 className="card-text">{info && info.timeElapsed}</h6>

            <button type="button" className="btn btn-primary" onClick={load}>
              Reload from server
            </button>

          </div>
        </div>
      </div>
    );
  }
}

export default InfoBar;
