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
    public function index()
    {
        $userId = Auth::id();
        return response()->json(Category::where('userId', $userId)->get());
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

        return response()->json($category, 201);
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

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::where('_id', $id)->where('userId', Auth::id())->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}
