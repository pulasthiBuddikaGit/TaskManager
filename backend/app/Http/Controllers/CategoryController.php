<?php
// 2. app/Http/Controllers/Api/CategoryController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    //I have used two different ways to fetch the user ID in here and in the TaskController.
    //In this controller, I am using Auth::id() to get the authenticated user's ID.
    // In the TaskController, I am using $request->user()->_id to get the authenticated user's ID.
    public function index()
    {
        $categories = Category::where('userId', Auth::id())
            ->orderBy('updated_at', 'desc') // Sort by latest updated
            ->get();

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::create([
            'name' => $request->name,
            'userId' => Auth::id()
        ]);

        // ✅ Return updated list of categories
        return $this->index();

        //return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::where('_id', $id)->where('userId', Auth::id())->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->update(['name' => $request->name]);

        // ✅ Return updated list of categories
        return $this->index();

        //return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::where('_id', $id)->where('userId', Auth::id())->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        // ✅ Return updated list of categories
        return $this->index();

        //return response()->json(['message' => 'Category deleted']);
    }
}
