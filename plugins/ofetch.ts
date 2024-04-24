import { ofetch } from 'ofetch';
import {defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {

globalThis.$fetch = await ofetch.create({

    onRequest({ request, options}) {

      const config = useRuntimeConfig();

      if (!request.toString().startsWith('/_')) {
        options.baseURL = config.public.apiBaseUrl;
        options.headers = {
          ...options.headers,
          
        };
      } else {
        options.baseURL = '';
      }
    },
   

  });
});