package com.irremote.pro;

import android.content.Context;
import android.hardware.ConsumerIrManager;
import android.os.Build;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import org.json.JSONArray;
import org.json.JSONException;

/**
 * IR Blaster Plugin for Android WebView
 * Provides access to the built-in IR transmitter via JavaScript interface
 */
public class IRBlasterPlugin {
    private static final String TAG = "IRBlasterPlugin";
    private Context context;
    private ConsumerIrManager irManager;
    private boolean hasIrEmitter = false;

    public IRBlasterPlugin(Context context) {
        this.context = context;
        initIR();
    }

    private void initIR() {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                irManager = (ConsumerIrManager) context.getSystemService(Context.CONSUMER_IR_SERVICE);
                if (irManager != null) {
                    hasIrEmitter = irManager.hasIrEmitter();
                    Log.d(TAG, "IR Emitter available: " + hasIrEmitter);
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error initializing IR: " + e.getMessage());
            hasIrEmitter = false;
        }
    }

    /**
     * Check if device has IR emitter
     */
    @JavascriptInterface
    public boolean hasIrEmitter() {
        return hasIrEmitter;
    }

    /**
     * Transmit IR code with given frequency and pattern
     * @param frequency Carrier frequency in Hz (typically 38000)
     * @param pattern Array of on/off times in microseconds
     */
    @JavascriptInterface
    public boolean transmit(int frequency, String patternJson) {
        if (!hasIrEmitter || irManager == null) {
            Log.w(TAG, "IR emitter not available");
            return false;
        }

        try {
            JSONArray jsonArray = new JSONArray(patternJson);
            int[] pattern = new int[jsonArray.length()];
            for (int i = 0; i < jsonArray.length(); i++) {
                pattern[i] = jsonArray.getInt(i);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                irManager.transmit(frequency, pattern);
                Log.d(TAG, "IR transmitted: freq=" + frequency + ", pattern length=" + pattern.length);
                return true;
            }
        } catch (JSONException e) {
            Log.e(TAG, "Error parsing pattern: " + e.getMessage());
        } catch (Exception e) {
            Log.e(TAG, "Error transmitting IR: " + e.getMessage());
        }
        return false;
    }

    /**
     * Transmit NEC protocol code
     * @param frequency Carrier frequency
     * @param hexCode Hex code string (e.g., "0xE0E040BF")
     */
    @JavascriptInterface
    public boolean transmitNEC(int frequency, String hexCode) {
        try {
            long code = Long.decode(hexCode);
            int[] pattern = generateNECPattern(code);
            return transmit(frequency, new JSONArray(pattern).toString());
        } catch (Exception e) {
            Log.e(TAG, "Error transmitting NEC: " + e.getMessage());
            return false;
        }
    }

    /**
     * Generate NEC protocol timing pattern from code
     */
    private int[] generateNECPattern(long code) {
        // NEC protocol: 9ms burst, 4.5ms space, then 32 bits
        // 0 = 562.5µs burst + 562.5µs space
        // 1 = 562.5µs burst + 1687.5µs space
        
        int[] pattern = new int[67]; // 2 (header) + 64 (32 bits * 2) + 1 (final burst)
        int index = 0;
        
        // Leader code
        pattern[index++] = 9000; // 9ms burst
        pattern[index++] = 4500; // 4.5ms space
        
        // 32 bits of data
        for (int i = 31; i >= 0; i--) {
            pattern[index++] = 562; // burst
            if (((code >> i) & 1) == 1) {
                pattern[index++] = 1688; // space for 1
            } else {
                pattern[index++] = 562; // space for 0
            }
        }
        
        // Final burst
        pattern[index++] = 562;
        
        return pattern;
    }

    /**
     * Get supported carrier frequencies
     */
    @JavascriptInterface
    public String getCarrierFrequencies() {
        if (!hasIrEmitter || irManager == null) {
            return "[]";
        }

        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                ConsumerIrManager.CarrierFrequencyRange[] ranges = irManager.getCarrierFrequencies();
                if (ranges != null) {
                    JSONArray result = new JSONArray();
                    for (ConsumerIrManager.CarrierFrequencyRange range : ranges) {
                        JSONArray rangeArray = new JSONArray();
                        rangeArray.put(range.getMinFrequency());
                        rangeArray.put(range.getMaxFrequency());
                        result.put(rangeArray);
                    }
                    return result.toString();
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error getting frequencies: " + e.getMessage());
        }
        return "[]";
    }

    /**
     * Register this plugin with a WebView
     */
    public static void register(WebView webView, Context context) {
        IRBlasterPlugin plugin = new IRBlasterPlugin(context);
        webView.addJavascriptInterface(plugin, "AndroidIR");
        Log.d(TAG, "IRBlasterPlugin registered with WebView");
    }
}
