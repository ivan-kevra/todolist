import { Dispatch } from "@reduxjs/toolkit";
import { appActions } from "app/model/app.slice";
import { BaseResponseType } from "common/types/types";

/**
 * Server application error handler.
 *
 * @template T - type of the server response data
 * @param {Dispatch} dispatch - Redux dispatcher function for dispatching actions
 * @param {BaseResponseType<T>} data - server response data
 * @param {boolean} [showError=true] - flag indicating whether to show the error to the user
 * @returns {void}
 */

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponseType<T>, showError: boolean = true) => {
  showError && dispatch(appActions.setAppError({ error: data.messages[0] || "Error" }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
