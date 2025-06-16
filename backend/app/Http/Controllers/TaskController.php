<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::where('userId', $request->user()->_id)
                    ->orderBy('updated_at', 'desc') // Sort by most recently updated
                    ->get();

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'heading' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:Not started,In progress,Completed',
            'priority' => 'required|string|in:Low,Normal,High',
            'categoryId' => 'nullable|string|exists:categories,_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task = Task::create([
            'heading' => $request->heading,
            'description' => $request->description,
            'status' => $request->status,
            'priority' => $request->priority,
            'userId' => $request->user()->_id,
            'categoryId' => $request->categoryId
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::where('_id', $id)->where('userId', $request->user()->_id)->first();
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'heading' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:Not started,In progress,Completed',
            'priority' => 'required|string|in:Low,Normal,High',
            'categoryId' => 'nullable|string|exists:categories,_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task->update($request->only(['heading', 'description', 'status', 'priority', 'categoryId']));

        return response()->json($task);
    }

    public function destroy(Request $request, $id)
    {
        $task = Task::where('_id', $id)->where('userId', $request->user()->_id)->first();
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
