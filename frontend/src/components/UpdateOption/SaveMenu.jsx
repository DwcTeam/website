import React from "react";
import PropTypes from 'prop-types';

class SaveMenu extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="container">
                <div className="row row-cols-1 row-cols-md-1 g-3">
                    <div className="position-fixed bottom-0 end-0" style={{zIndex: "11"}}>
                        <div aria-live="polite" alive={true} className="d-flex justify-content-center align-items-center w-100">
                            <div id="liveToast" className="toast" role="alert" aria-live="assertive" alive={true}>
                                <div className="col" dir="ltr">
                                    <div className="card bg-dark m-2" style={{border: "1px solid var(--color1);"}}>
                                        <div className="card-body">
                                            <h1 className="set text-light d-inline-flex float-end ">احذر — لديك تغييرات لم يتم حفظها!</h1>
                                            <div className="group-buttons float-start save-menu">
                                                <button className="btn me-2 mx-2 save-button">حفظ التغييرات</button>
                                                <button className="btn me-2 mx-2 cancel-button">إلغاء</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SaveMenu;
