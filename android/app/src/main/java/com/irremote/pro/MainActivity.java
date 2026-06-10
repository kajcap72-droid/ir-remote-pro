package com.irremote.pro;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Register IR Blaster plugin with WebView
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            IRBlasterPlugin.register(webView, this);
        }
    }
}
