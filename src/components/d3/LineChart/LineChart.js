import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
// import debounce from 'lodash.debounce';

import Loading from '../../Loading/Loading';
import * as LineChartActions from '../../../redux/modules/lineChart';
import drawVisualization from "../../../d3/drawLineChartBasic";
// import { withApp } from '../../../hoc';

@connect(
  (state, { as }) => ({
    error: state.lineChartCollection[as].error,
    errorResponse: state.lineChartCollection[as].errorResponse,
    loading: state.lineChartCollection[as].loading,
    loaded: state.lineChartCollection[as].loaded,
    data: state.lineChartCollection[as].data,
  }),
  (dispatch, { as }) => bindActionCreators({ ...LineChartActions }, dispatch, as)
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

  handleUpdate = (e) => {
    console.log('>>>>>>>>>>>>>>>> LineChart > handleUpdate() > data1: ', data);
    const { data, addNewDataFunc } = this.props;

    e.preventDefault();

    let xValue = this.inputXValueRef.current;
    let yValue = this.inputYValueRef.current;

    let x = new Date(xValue.value).toUTCString();
    let y = parseInt(yValue.value);
    let newData = {x, y};

    let request = {
      data: data,
      newData: newData
    }

    console.log('>>>>>>>>>>>>>>>> LineChart > handleUpdate() > request: ', request);

    addNewDataFunc(request);

    this.inputXValueRef.current.value = '';
    this.inputYValueRef.current.value = '';
  };

  componentDidMount() {
    const { request, loadFunc } = this.props;
    console.log('>>>>>>>>>>>>>>>> LineChart > componentDidMount() > request: ', request);
    loadFunc({ request: request });
  }

  // invoked immediately after updating
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { data, error, loaded } = this.props;

    console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() <<<<<<<<<<<<<<<<<<<<<<<< DATA: ', data);

    // loading LOAD_FAIL
    if (error) {
      console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_FAIL > error: ', error);
      // console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_FAIL > errorResponse: ', errorResponse);
    }

    // loading LOAD_SUCCESS
    if (loaded) {
      console.log('>>>>>>>>>>>>>>>> LineChart > componentDidUpdate() > LOAD_SUCCESS: ');
      const containerTarget = this.containerRef.current;
      // console.log('>>>>>>>>>>>>>>>> LineChartA > componentDidUpdate() > containerTarget: ', containerTarget);
      // first render of inital data
      drawVisualization(data, containerTarget);
      // if (data !== prevState.data) {
      //   drawVisualization(data.values, containerTarget);
      // }
      // re-render of initial data and all 'newData'
      // if (newData) {
      //   const element = containerTarget.querySelector('svg');
      //   element.parentNode.removeChild(element);
      //   const updatedData = prevState.data.values.concat(newData);
      //   drawVisualization(updatedData, containerTarget);
      // }
    }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> LineChart > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // invoked before rendering when new props or state are being received
    console.log('>>>>>>>>>>>>>>>> LineChart > shouldComponentUpdate() > nextProps: ', nextProps);
    console.log('>>>>>>>>>>>>>>>> LineChart > shouldComponentUpdate() > nextState: ', nextState);
    return nextProps;
  };

  // derive state:
  // enables a component to update its internal state as the result of changes in props
  // invoked right before calling the render method, both on the initial mount and on subsequent updates
  // invoked after a component is instantiated as well as before it is re-rendered
  // --------------------------------------------------------------------------------
  static getDerivedStateFromProps(props, state) {
    console.log('>>>>>>>>>>>>>>>> LineChart > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
    return null;
  };

  componentDidCatch(error, info) {
    console.log('>>>>>>>>>>>>>>>> LineChart > componentDidCatch() > info.componentStack: ', info.componentStack);
  }

  // ================================================================================

  render() {

    // const styles = require('./scss/LineChart.scss');
    const { data, title, error, loading, loaded } = this.props;
    const { containerRef, inputXValueRef, inputYValueRef } = this;

    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< data: ', {data});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< error: ', {error});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< title: ', {title});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< loaded: ', {loaded});
    console.log('>>>>>>>>>>>>>>>> LineChart > render() <<<<<<<<<<<<<<<<< loading: ', {loading});

    // <div class="svg-container LineChart__lineChart--dEEuc2Nzc">
    //  <svg class="svg-content" preserveaspectratio="xMinYMin meet" viewbox="-20 -20 400 400"></svg>
    // </div>

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

              {error && (

                  <div className="alert alert-danger text-center" role="alert">ERROR</div>

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
