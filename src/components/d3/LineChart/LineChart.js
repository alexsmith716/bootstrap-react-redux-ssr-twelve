import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
// import debounce from 'lodash.debounce';

import Loading from '../../Loading/Loading';
import * as lineChartActions from '../../../redux/modules/lineChart';
import drawVisualization from "../../../d3/drawLineChartBasic";
// import { withApp } from '../../../hoc';

@connect(
  (state, { as }) => ({
    loading: state.lineChartCollection[as].loading,
    loaded: state.lineChartCollection[as].loaded,
    data: state.lineChartCollection[as].data,
    error: state.lineChartCollection[as].error,
    errorResponse: state.lineChartCollection[as].errorResponse,
  }),
  (dispatch, { as }) => bindActionCreators({ ...lineChartActions }, dispatch, as)
)

class LineChart extends Component {

  // constructor for subclass
  constructor(props){
    super(props);

    // refs provide a way to access DOM nodes or React elements created in the render method
    this.containerRef = createRef();
    this.inputXValueRef = createRef();
    this.inputYValueRef = createRef();
    console.log('>>>>>>>>>>>>>>>> LineChart > constructor() <<<<<<<<<<<<<<<<<<<<<<');
  }

  static propTypes = {
    // request: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // data: PropTypes.arrayOf(PropTypes.object).isRequired,
    // error: PropTypes.bool,
    // errorResponse: PropTypes.object,
    // loadFunc: PropTypes.func.isRequired,
    // addNewDataFunc: PropTypes.func.isRequired,
  }

  // ==============================================================================================


  // MOUNTING (instance of a component is being created and inserted into the DOM)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // constructor()

  // static getDerivedStateFromProps(props, state)

  // render()

  componentDidMount() {
    const { data } = this.props;
    console.log('>>>>>>>>>>>>>>>> LineChart > componentDidMount() > data: ', data);
    if (data === null) {
      const { request, loadFunc } = this.props;
      loadFunc({ request: request });
    } else {
      const containerTarget = this.containerRef.current;
      drawVisualization(data, containerTarget);
    }
  }

  // ==============================================================================================


  // UPDATING (update was caused by changes to props or state. component is being re-rendered.)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // derive state:
  // enables a component to update its internal state as the result of changes in props
  // invoked right before calling the render method, both on the initial mount and on subsequent updates
  // invoked after a component is instantiated as well as before it is re-rendered
  // --------------------------------------------------------------------------------
  static getDerivedStateFromProps(props, state) {
    console.log('>>>>>>>>>>>>>>>> LineChart > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
    return null;
  };

  // invoked before rendering when new props or state are being received (default: true)
  // let react know if a component's output is not affected by the current change in state or props
  // evaluate "true" ? re-render
  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>>>>>>>>>>>>>>> LineChart > shouldComponentUpdate()?? > nextProps: ', nextProps);
    console.log('>>>>>>>>>>>>>>>> LineChart > shouldComponentUpdate()?? > nextState: ', nextState);
    return nextProps;
  };

  // render()

  // there may be delays between “render” phase lifecycles (like render) 
  //  and “commit” phase lifecycles (like getSnapshotBeforeUpdate and componentDidUpdate)

  // invoked before most recently rendered output is committed to the DOM
  // enables capturing information from the DOM (e.g. scroll position) before it is changed
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  // invoked immediately after updating
  // not called for the initial render
  // component has been updated, so do something
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loading, loaded, error, errorResponse, data } = this.props;
    const containerTarget = this.containerRef.current;
    // console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > containerTarget: ', containerTarget);

    console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() <<<<<<<<<<<<<<<<<<<<<<<< DATA: ', data);

    // LOAD_FAIL
    if (error) {
      console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_FAIL > error: ', error);
      console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_FAIL > errorResponse: ', errorResponse);
    }

    // LOAD_SUCCESS
    if (loaded && !loading) {
      console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_SUCCESS: ');

      console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_SUCCESS > data: ', data);
      console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_SUCCESS > prevProps.data: ', prevProps.data);

      if (data === prevProps.data) {
        console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() @@@@@@@@@@@@@@ > 11111111111111');
        console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() @@@@@@@@@@@@@@ > containerTarget1: ', containerTarget);
      }

      if (data !== prevProps.data) {
        console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() @@@@@@@@@@@@@@ > 22222222222222');
        // const element = containerTarget.querySelector('svg');
        // element.parentNode.removeChild(element);
        console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() @@@@@@@@@@@@@@ > containerTarget2: ', containerTarget);
      }

      drawVisualization(data, containerTarget);
    }
  }

  // ==============================================================================================


  // UNMOUNTING (component is being removed from the DOM)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> LineChart > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<');
  }

  // ==============================================================================================


  // ERROR HANDLING (error during render, in a lifecycle, in the constructor of any child component)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // invoked after an error has been thrown by a descendant component
  // receives the error thrown as param and returns a value to update state
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    // return { hasError: true };
    return;
  }

  // invoked after an error has been thrown by a descendant component
  // used for things like logging errors
  componentDidCatch(error, info) {
    console.log('>>>>>>>>>>>>>>>> LineChart > componentDidCatch() > info.componentStack: ', info.componentStack);
  }

  // ==============================================================================================


  handleUpdate = (e) => {
    const { data, addNewDataFunc } = this.props;

    console.log('>>>>>>>>>>>>>>>> LineChart > handleUpdate() > data: ', data);

    e.preventDefault();

    let xValue = this.inputXValueRef.current;
    let yValue = this.inputYValueRef.current;

    console.log('>>>>>>>>>>>>>>>> LineChart > handleUpdate() > xValue: ', xValue.value);
    console.log('>>>>>>>>>>>>>>>> LineChart > handleUpdate() > yValue: ', yValue.value);

    if (xValue.value !== '' && yValue.value !== '') {

      let x = new Date(xValue.value).toUTCString();
      let y = parseInt(yValue.value);
      let newData = {x, y};

      let request = {
        data: data,
        newData: newData
      }

      console.log('>>>>>>>>>>>>>>>> LineChart > handleUpdate() > request: ', request);

      addNewDataFunc(request);
    }

    this.inputXValueRef.current.value = '';
    this.inputYValueRef.current.value = '';
  };

  // ================================================================================

  render() {

    // const styles = require('./scss/LineChart.scss');
    const { loading, loaded, title, data, error, errorResponse } = this.props;
    const { containerRef, inputXValueRef, inputYValueRef } = this;

    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< data: ', {data});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< error: ', {error});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< title: ', {title});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< loaded: ', {loaded});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< loading: ', {loading});

    return (

      <div className="row justify-content-md-center">
        <div className="col-md-auto">

          <div className="container-flex bg-color-ivory container-padding-border-radius-2">
            <div className="display-flex-justify-direction-align-center width-500">

              <p>{title}</p>

              {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

              {loading && (

                  <Loading text="Loading" />

                )}

              {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}
              {/* (>>>>>>>>>>>>>>>>>>>>>> test '!loaded' vs 'loaded' >>>>>>>>>>>>>>>>>>>>>>>>) */}

              {error &&
                !loading && (

                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <div className="text-center">RENDERING ERROR<br/><span>{`Message: ${errorResponse.message}`}</span></div>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                )}

              {/* (>>>>>>>>>>>>>>>>>>>>>> DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

              {loaded &&
                !loading && (

                  <div>

                    <div className={`svg-container mb-4`} ref={containerRef}></div>

                    <form className="form-inline" onSubmit={this.handleUpdate}>

                      <div className="form-group mb-2">
                        <label htmlFor="datePicker1" className="sr-only">Enter Time</label>
                        <input type="date" className="form-control" id="datePicker1" ref={inputXValueRef} placeholder="Enter Time" />
                      </div>
                      <div className="form-group mx-sm-3 mb-2">
                        <label className="enterValue1" className="sr-only">Enter Value</label>
                        <input type="number" className="form-control" id="enterValue1" ref={inputYValueRef} placeholder="Enter Value" />
                      </div>
                      <button type="submit" className="btn btn-primary mb-2">Submit</button>
                    </form>
                  </div>

                )}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default LineChart;
