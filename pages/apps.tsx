import * as React from 'react';
import Apps from '@/components/SearchApps'
import Script from 'next/script'
import { SnackbarProvider } from 'notistack';

export default function Home() {
  return (
    <>
    <SnackbarProvider maxSnack={3}>
      <Apps></Apps>
      <Script id="show-banner" strategy="beforeInteractive">
        {`
          function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }

          let authKey = getCookie("authKey");
          if (authKey != "") {
           console.log("active");
          } else {
           location.replace("/login")
          }
        `}
      </Script>
    </SnackbarProvider>
    </>
  )
}