package cc.phantasien.auryn;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

public class AurynAndroid {

  private static AurynAndroid instance = null;

  private AurynAndroid() {}

  public static void Start(Activity mainActivity) {
    instance = new AurynAndroid();

    BufferedReader reader = null;

    try {
      reader = new BufferedReader(
        new InputStreamReader(mainActivity.getAssets().open("index.js"))
      );

      String source = "";
      String mLine = reader.readLine();
      while (mLine != null) {
        if (mLine != null) {
          source += mLine;
        }

        mLine = reader.readLine();
      }
      Log.d("AurynAndroid", "Run auryn native with " + source);

      instance.run(source);
    } catch (IOException e) {
       Log.d("AurynAndroid", e.toString());
    } finally {
      if (reader != null) {
         try {
           reader.close();
         } catch (IOException e) {
           Log.d("AurynAndroid", e.toString());
         }
      }
    }
  }
  
  public native void run(String source);

  static {
    System.loadLibrary("auryn");
  }
}
