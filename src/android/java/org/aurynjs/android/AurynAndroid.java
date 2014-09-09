package org.aurynjs.android;

import android.content.Context;

import android.util.Log;

public class AurynAndroid {

    public AurynAndroid(Context ctx) {
    }

    public void start()
    {
        run();
    }
    
    public native void run();

    static {
        System.loadLibrary("auryn");
    }
}