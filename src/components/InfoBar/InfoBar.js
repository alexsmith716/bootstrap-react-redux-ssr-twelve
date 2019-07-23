import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { load } from '../../redux/modules/info';
import Loading from '../Loading/Loading';

@connect(
  (state) => ({ 
    info: state.info.data,
    isLoading: state.info.isLoading
  }),
  { load }
)

class InfoBar extends Component {

  static propTypes = {
    // info: PropTypes.shape({
    //   // value: `${v}`,
    //   // timeElapsed: timeElapsedModule1.getSecondsElapsed(),
    //   // time: Date.now(),
    //   // delay: `${delay}`,
    //   // message: 'RESOLVED! This came from the mock API.',
    //      isLoading: PropTypes.bool,
    // }),
    load: PropTypes.func.isRequired
  };

  static defaultProps = {
    info: null
  };

  // ============================================================

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> InfoBar > componentDidMount() <<<<<<<<<<<<<<<<<<<<<<');
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('>>>>>>>>>>>>>>>> InfoBar > componentDidUpdate() <<<<<<<<<<<<<<<<<<<<<<');
  };

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> InfoBar > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<');
  };

  shouldComponentUpdate(nextProps, nextState) {
    // invoked before rendering when new props or state are being received
    console.log('>>>>>>>>>>>>>>>> InfoBar > shouldComponentUpdate() > nextProps: ', nextProps);
    console.log('>>>>>>>>>>>>>>>> InfoBar > shouldComponentUpdate() > nextState: ', nextState);
    return nextProps;
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> InfoBar > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  //   return null;
  // };

  componentDidCatch(error, info) {
    console.log('>>>>>>>>>>>>>>>> InfoBar > componentDidCatch() > info.componentStack: ', info.componentStack);
  };

  // ============================================================

  render() {

    const { info, isLoading, load } = this.props;
    const styles = require('./scss/InfoBar.scss');

    return (

      <div className="card text-center">

        <div className="card-body bg-light">

          {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

          {isLoading && (
              <Loading text="Loading" />
            )}

          {/* (>>>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

          {!isLoading && (

              <div>
                <div className={`card-title ${styles.infoBar}`}>
                  <h5>InfoBar message: '<span className={styles.message}>{info ? info.message : 'no message!'}</span>'</h5>

                  <h6>{info && new Date(info.time).toString()}</h6>

                  <h6>{info && info.timeElapsed}</h6>
                </div>

                <button type="button" className="btn btn-primary" onClick={load}>
                  Reload from server
                </button>
              </div>
            )}

        </div>
      </div>

    );
  }
}

export default InfoBar;
