import { createAsyncThunk } from "@reduxjs/toolkit";

// Inside your fetchAuth async action
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: any) => {
    console.log('params=>',params);
      
  return await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: params?.username,
            password: params?.password,
        //   username: 'kminchelle',
        //   password: '0lelplR',
          // expiresInMins: 60, // optional
        })
      })
      .then(res => res.json())
      .catch((err) => {
        return err
      })
});
