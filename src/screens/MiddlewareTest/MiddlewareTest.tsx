import React from "react";
import { connect } from "react-redux";
import { getSwapiData } from "@/rdx/lesson-17-hw/asyncFlow/myThunk";
import { RootState } from "@/rdx/store";

const mapDispatchToProps = {
  getSwapiData,
};

const mapStateToProps = (state: RootState) => {
  return {
    thunkData: state.myThunkReducer.data,
  };
};

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

class RawMiddlewareTest extends React.Component<Props> {
  runTHunkMiddleware = () => {
    this.props.getSwapiData();
  };

  render() {
    return (
      <>
        <button onClick={() => this.props.getSwapiData()}>
          Test Thunk Middleware with thunk action
        </button>
        <pre>{JSON.stringify(this.props.thunkData, null, " ")}</pre>
      </>
    );
  }
}

export const MiddlewareTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawMiddlewareTest);
