import { authenticationService,Profile } from "@/services/authenticationService";
import { RootState } from '@/store';
import { call,delay,put,select,takeLatest } from 'redux-saga/effects';
import { signUserIn } from "../slices/UserSlice";

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

export function* userSaga() {
    yield takeLatest(signUserIn.fulfilled.type,handleProfileRefresh);
}