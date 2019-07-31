import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
// actionCreators
import * as filterableTableActions from '../../redux/modules/filterableTable';
// import { selectedOption } from '../../redux/modules/filterableTable';
import enumerateObjectValues from '../../utils/enumerateObjectValues';
import promiseGenerator from '../../utils/promiseGenerator';

// should > render > didupdate

// UI bindings
// @connect({mapStateToProps, mapDispatchToProps})
// connect the view to the action creators
// connect() Returns:
// The return of connect() is a wrapper function
// The return of connect() takes your component and returns a wrapper component with the additional props it injects
// ....................................
//    export default connect(
//      mapStateToProps,
//      mapDispatchToProps
//    )(FilterableTable)
// ....................................
@connect(
  (state, { as }) => ({
    dropDownOptionSelected: state.filterableTableCollection[as].dropDownOptionSelected,
    error: state.filterableTableCollection[as].error,
    errorResponse: state.filterableTableCollection[as].errorResponse,
    isLoading: state.filterableTableCollection[as].isLoading,
    fetchedData: state.filterableTableCollection[as].fetchedData,
    // optionsArray: state.filterableTableCollection[as].optionsArray,
    // description: state.filterableTableCollection[as].description,
    filterText: state.filterableTableCollection[as].filterText,
    inStockOnly: state.filterableTableCollection[as].inStockOnly,
  }),
  // (dispatch, { as }) => bindActionCreators(filterableTableActions, dispatch, as)
  (dispatch, { as }) => bindActionCreators({ ...filterableTableActions }, dispatch, as)
)

class FilterableTable extends Component {

  static propTypes = {
    dropDownOptionSelected: PropTypes.string,
    error: PropTypes.bool,
    errorResponse: PropTypes.object,
    isLoading: PropTypes.bool,
    // fetchedData: PropTypes. .isRequired,
    // optionsArray: PropTypes.array.isRequired,
    // description: PropTypes.string,
    filterText: PropTypes.string,
    inStockOnly: PropTypes.bool,
    selectedOption: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
  };

  // static defaultProps = {};

  // handleFilterTextChange(filterText) {
  //   this.setState({ filterText: filterText });
  // };

  // handleInStockChange(inStockOnly) {
  //   this.setState({ inStockOnly: inStockOnly })
  // };

  handleFilterTextChange(filterText) {
    // this.setState({ filterText: filterText });
  }

  handleInStockChange(inStockOnly) {
    // this.setState({ inStockOnly: inStockOnly })
  }

  handleDropdownChange = (e) => {
    const { selectedOption } = this.props;
    // e.preventDefault();
    selectedOption({
      selected: e.target.value
    });
  };

  // ============================================================

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > props.description: ', this.props.description);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > this.props.dropDownOptionSelected: ', this.props.dropDownOptionSelected);
    // this._loadAsyncData(this.props.id);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.state.externalData === null) {
    //   this._loadAsyncData(this.props.id);
    // }

    const { error, errorResponse, isLoading, fetchedData, dropDownOptionSelected, load } = this.props;

    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() <<<<<<<<<<<<<<: ', this.props.description);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > this.props.dropDownOptionSelected: ', dropDownOptionSelected);

    if (fetchedData === null && !error && isLoading) {
      console.log('11111111111111111111 ####################################### 11111111111111111111');
      load({ request: dropDownOptionSelected });
    }

    // loading LOAD_FAIL
    if (error && !isLoading) {
      console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > SELECTED_OPTION LOAD LOAD_FAIL: ', errorResponse.message);
    }

    // loading LOAD_SUCCESS
    if (!error && !isLoading && fetchedData !== null) {

      const result = promiseGenerator();
      let p  = result.next().value;

      p.then(r => {
        console.log('>>>>>>>>>>>>>>>> FilterableTable > promiseGenerator() > result.next().value: ', p);
        console.log('>>>>>>>>>>>>>>>> FilterableTable > promiseGenerator() > resolve: ', r);
        return result.next(r)
      });

      return enumerateObjectValues(fetchedData)
        .then(response => {
          console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > SELECTED_OPTION LOAD LOAD_SUCCESS > enumerateObjectValues > returned: ', response);
        })
        .catch(error => {
          console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > SELECTED_OPTION LOAD LOAD_SUCCESS > enumerateObjectValues > ERROR: ');
        })
    }
  };

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentWillUnmount() <<<<<<<<<<<<<<');
  };

  shouldComponentUpdate(nextProps, nextState) {
    // invoked before rendering when new props or state are being received
    console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate() > nextProps: ', nextProps);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate() > nextState: ', nextState);
    return nextProps;
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  //   return null;
  // };

  componentDidCatch(error, info) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidCatch() > info.componentStack: ', info.componentStack);
  };

  // ============================================================

  render() {

    const styles = require('./scss/FilterableTable.scss');

    const { error, errorResponse, isLoading, dropDownOptionSelected, fetchedData } = this.props;
    const { optionsArray, description, filterText, inStockOnly } = this.props;

    const loadingText = 'Fetching Requested Data ...';
    // const errorText = {`${errorResponse.message} /\n ${errorResponse.message}`};
    let items = null;

    let arrayLike = fetchedData && fetchedData.length > 0
      ? arrayLike = true
      : arrayLike = null;

    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > externalData > ARRAYLIKE ??? ', arrayLike, '!');
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > dropDownOptionSelected: ', dropDownOptionSelected);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > fetchedData: ', fetchedData);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > isLoading: ', isLoading);
    // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.entries()::::::: ', Object.entries(fetchedData));

    // return (
    //   <div>{`${dropDownOptionSelected}`}</div>
    // )

    if (fetchedData) {

      if (arrayLike) {

        items = Array.from(fetchedData).map((item, index) => {

          let fromItem = item;
          let fromIndex = index;
          let ok = Object.keys(fromItem).map((item, index) => {
            return <div key={index}>{`${fromIndex}: ${item}: "${fromItem[item]}"`}</div>
          })

          return (
            <div key={index}>
              {ok}

              {fromIndex !== fetchedData.length-1 && (
                <div key={index}>---------</div>
              )}
            </div>
          )
        });

      } else {

        items = Object.keys(fetchedData).map((item, index) => {
          // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.keys(): index: ', index, ' item: ', item,' fetchedData[item]: ', fetchedData[item]);
          return <div key={index}>{`${index}: ${item}: "${fetchedData[item]}"`}</div>;
        });

        // items = Object.keys(fetchedData).map((item, index) => (
        //   <div key={index}>{`${index}: ${item}: "${fetchedData[item]}"`}</div>
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

        {dropDownOptionSelected !== '' &&
          !error &&
          isLoading && (

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
          !isLoading && (

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

        {fetchedData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items !== null && (

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

        {fetchedData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items === null && (

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
                      tablesData={ fetchedData } 
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
