<?php

namespace App\Http\Controllers;

use App\Models\Some;

class SomeController extends Controller {

    public function show($url) {
        $news = Some::where('url', $url)->first();
        if(is_null($news)){
            abort(404);
        }
        $d = explode('-', $news->created_at->format('d-m-Y'));
        $news->date = $d[0] . ' ' . RusDate::get_mounth($d[1]) . ' ' . $d[2];
        $meta['title'] = $news->title;
        $meta['description'] = $news->description;
        $meta['keywords'] = $news->keywords;
        return view('template', ['news' => $news, 'ajax' => false, 'meta' => $meta]);
    }
    
    public function ajax_show($url) {
        $news = Some::where('url', $url)->first();
        $meta['title'] = $news->title;
        $meta['description'] = $news->description;
        $meta['keywords'] = $news->keywords;
        $view = view('template', ['news' => $news, 'ajax' => true, 'meta' => $meta])->render();
        return response()->json(['html'=>$view, 'meta' => $meta]);
    }
  
}
