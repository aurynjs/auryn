package cc.phantasien.auryn;

import android.content.Context;

import android.util.Log;

public class AurynAndroid {

    private static AurynAndroid instance = null;

    private AurynAndroid() {}

    public static void Start() {
        instance = new AurynAndroid();
        Log.d("AurynAndroid", "Run auryn native");
        instance.run();
    }
    
    public native void run();

    static {
        System.loadLibrary("auryn");
    }
}
