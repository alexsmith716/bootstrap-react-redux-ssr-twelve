import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';

import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
import * as filterableTableActions from '../../redux/modules/filterableTable';
// import enumerateObjectValues from '../../utils/enumerateObjectValues';

@connect(
  (state, { as }) => ({
    dropDownOptionSelected: state.filterableTableCollection[as].dropDownOptionSelected,
    loading: state.filterableTableCollection[as].loading,
    loaded: state.filterableTableCollection[as].loaded,
    data: state.filterableTableCollection[as].data,
    error: state.filterableTableCollection[as].error,
    errorResponse: state.filterableTableCollection[as].errorResponse,
    filterText: state.filterableTableCollection[as].filterText,
    inStockOnly: state.filterableTableCollection[as].inStockOnly,
  }),
  (dispatch, { as }) => bindActionCreators({ ...filterableTableActions }, dispatch, as)
)

class FilterableTable extends Component {

  static propTypes = {
    // dropDownOptionSelected: PropTypes.string,
    // error: PropTypes.bool,
    // errorResponse: PropTypes.object,
    // loading: PropTypes.bool,
    // // data: PropTypes. .isRequired,
    // // optionsArray: PropTypes.array.isRequired,
    // // description: PropTypes.string,
    // filterText: PropTypes.string,
    // inStockOnly: PropTypes.bool,
    // selectedOption: PropTypes.func.isRequired,
    // load: PropTypes.func.isRequired,
  };

  // ==============================================================================================


  // MOUNTING (instance of a component is being created and inserted into the DOM)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  // constructor()

  // static getDerivedStateFromProps(props, state)

  // render()

  componentDidMount() {
    const { data } = this.props;
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > data1: ', data);
    if (data === null) {
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > data2');
    } else {
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > data3');
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
    console.log('>>>>>>>>>>>>>>>> FilterableTable > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
    return null;
  };

  // invoked before rendering when new props or state are being received (default: true)
  // let react know if a component's output is not affected by the current change in state or props
  // evaluate "true" ? re-render
  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate()?? > nextProps: ', nextProps);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate()?? > nextState: ', nextState);
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
    const { loading, loaded, error, errorResponse, data, load, dropDownOptionSelected } = this.props;

    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > description: ', this.props.description);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > dropDownOptionSelected: ', dropDownOptionSelected);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > DATA: ', data);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > prevProps.DATA: ', prevProps.data);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > error: ', error);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > errorResponse: ', errorResponse);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > loading: ', loading);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > loaded: ', loaded);

    if (data === prevProps.data) {
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() @@@@@@@@@@@@@@ > 11111111111111');
    }

    if (data !== prevProps.data) {
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() @@@@@@@@@@@@@@ > 22222222222222');
    }

    // LOAD_FAIL
    if (error) {
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > LOAD_FAIL > error: ', error);
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > LOAD_FAIL > errorResponse: ', errorResponse);
    }

    if (loading) {
      console.log('11111111111111111111 ####################################### 11111111111111111111');
      load({ request: dropDownOptionSelected });
    }

    if (loaded && !loading) {
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > LOAD_SUCCESS: ');
    }
  }

  // ==============================================================================================


  // UNMOUNTING (component is being removed from the DOM)
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<');
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
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidCatch() > info.componentStack: ', info.componentStack);
  }

  // ==============================================================================================

  handleDropdownChange = (e) => {
    const { selectedOption } = this.props;

    console.log('>>>>>>>>>>>>>>>> FilterableTable > handleDropdownChange() > selectedOption: ', selectedOption);

    // e.preventDefault();

    selectedOption({
      selected: e.target.value
    });
  };

  // ================================================================================

  render() {

    const styles = require('./scss/FilterableTable.scss');

    const { loading, loaded, data, error, errorResponse,  dropDownOptionSelected }  = this.props;
    const { optionsArray, description, filterText, inStockOnly } = this.props;

    const loadingText = 'Fetching Requested Data ...';
    // const errorText = {`${errorResponse.message} /\n ${errorResponse.message}`};
    let items = null;

    let arrayLike = data && data.length > 0
      ? arrayLike = true
      : arrayLike = null;

    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > externalData > ARRAYLIKE ??? ', arrayLike, '!');
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > dropDownOptionSelected: ', dropDownOptionSelected);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > data: ', data);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > loading: ', loading);
    // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.entries()::::::: ', Object.entries(data));

    // return (
    //   <div>{`${dropDownOptionSelected}`}</div>
    // )

    if (data) {

      if (arrayLike) {

        items = Array.from(data).map((item, index) => {

          let fromItem = item;
          let fromIndex = index;
          let ok = Object.keys(fromItem).map((item, index) => {
            return <div key={index}>{`${fromIndex}: ${item}: "${fromItem[item]}"`}</div>
          })

          return (
            <div key={index}>
              {ok}

              {fromIndex !== data.length-1 && (
                <div key={index}>---------</div>
              )}
            </div>
          )
        });

      } else {

        items = Object.keys(data).map((item, index) => {
          // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.keys(): index: ', index, ' item: ', item,' data[item]: ', data[item]);
          return <div key={index}>{`${index}: ${item}: "${data[item]}"`}</div>;
        });

        // items = Object.keys(data).map((item, index) => (
        //   <div key={index}>{`${index}: ${item}: "${data[item]}"`}</div>
        // ));

      }
    }

    // ------------------------------------------------------------------------------------

    return (

      <div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> DropdownSelect >>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className={`container-padding-border-radius-2`}>
          <div className="d-flex bg-color-ivory container-padding-border-radius-1">
            <div className="width-400">

              <DropdownSelect
                title={description}
                optionsArray={optionsArray}
                dropDownOptionSelected={dropDownOptionSelected}
                onChange={this.handleDropdownChange}
              />

            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {loading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  <Loading text={ loadingText } />

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {error &&
          !loading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  <div className="alert alert-danger text-center" role="alert">
                    <div>{errorResponse.documentation_url}</div>
                    <div>------------</div>
                    <div>{errorResponse.message}</div>
                  </div>

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> EXTERNAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {items !== null &&
          loaded &&
          !loading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  {items}

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOCAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {items === null &&
          loaded &&
          !loading && (

            <div>
              <br/>
                <div className={`container-padding-border-radius-2`}>
                  <div className="container-flex bg-color-ivory container-padding-border-radius-1">
                    <div className="width-400">

                      <SearchBar 
                        filterText={ filterText }
                        inStockOnly={ inStockOnly }
                        onFilterTextChange={ this.handleFilterTextChange }
                        onInStockChange={ this.handleInStockChange }
                      />

                    </div>
                  </div>

                  <br />

                  <div>

                    <Tables 
                      tablesData={ data } 
                      filterText={ filterText }
                      inStockOnly={ inStockOnly }
                    />

                  </div>
                </div>
            </div>
          )}

      </div>
    );
  }
}

export default FilterableTable;
