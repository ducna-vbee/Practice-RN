import { authenticationService,Profile } from "@/services/authenticationService";
import { RootState } from '@/store';
import { PayloadAction } from "@reduxjs/toolkit";
import { all,call,delay,put,race,select,take,takeLatest } from 'redux-saga/effects';
import { clearDeletionSession,handleLogout,setDeletionSession,signUserIn } from "../slices/UserSlice";


const getEmail = (state: RootState) => state.user.email;

function* handleProfileRefresh(action: any) {
    try
    {
        yield delay(2000);
        const email: string = yield select(getEmail);
        console.log(`Saga: Refreshing profile for ${email}`);
        const profileData: Profile = yield call(authenticationService.getProfile);

        yield put({
            type: 'user/updateProfile',
            payload: profileData,
        });
    }
    catch (error)
    {
        console.error("Saga profile refresh failed",error);
    }
}

function* handleAccountDeletion()
{
    while (true)
    {
        const action: PayloadAction<{ email: string }> = yield take("user/START_DELETION_FLOW");

        try
        {
            const { session_id } = yield call(authenticationService.requestDeleteAccount,action.payload.email);
            yield put(setDeletionSession(session_id));

            const { confirmed } = yield race({
                confirmed: take("user/CONFIRM_DELETION"),
                timeout: delay(30000),
                cancelled: take("user/CANCEL_DELETION"),
            });

            if (confirmed)
            {
                const reason = confirmed.payload.reason;
                yield call(authenticationService.performAccountDeletion,session_id,reason);
                yield put(handleLogout());
            }
            else
            {
                alert("Deletion session expired or cancelled.");
            }
        }
        catch (error)
        {
            console.error(error);
        }
        finally
        {
            yield put(clearDeletionSession());
        }
    }
}

export function* userSaga()
{
    yield all([
        takeLatest(signUserIn.fulfilled.type, handleProfileRefresh),
        handleAccountDeletion(), 
    ]);
}