<?php

namespace App\Http\Controllers;

use App\Models\Motorcycle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class MotorcycleController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Motorcycle::query()->latest('created_at')->get()->map(fn (Motorcycle $motorcycle) => $this->transform($motorcycle))
        );
    }

    public function show(string $id): JsonResponse
    {
        $motorcycle = Motorcycle::find($id);

        if (!$motorcycle) {
            return response()->json(['message' => 'Motorcycle not found.'], 404);
        }

        return response()->json($this->transform($motorcycle));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateMotorcycle($request);
        $data['id'] = 'mc-' . Str::lower(Str::random(10));
        $data['motorcycle_picture'] = $this->storePicture($request->input('motorcyclePicture'));

        $motorcycle = Motorcycle::create($data);

        return response()->json($this->transform($motorcycle), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $motorcycle = Motorcycle::find($id);

        if (!$motorcycle) {
            return response()->json(['message' => 'Motorcycle not found.'], 404);
        }

        $data = $this->validateMotorcycle($request);
        $picture = $request->input('motorcyclePicture');

        if (is_string($picture) && str_starts_with($picture, 'data:image/')) {
            $this->deletePicture($motorcycle->motorcycle_picture);
            $data['motorcycle_picture'] = $this->storePicture($picture);
        } else {
            $data['motorcycle_picture'] = $motorcycle->motorcycle_picture;
        }

        $motorcycle->update($data);

        return response()->json($this->transform($motorcycle->fresh()));
    }

    public function destroy(string $id): JsonResponse
    {
        $motorcycle = Motorcycle::find($id);

        if (!$motorcycle) {
            return response()->json(['message' => 'Motorcycle not found.'], 404);
        }

        $this->deletePicture($motorcycle->motorcycle_picture);
        $motorcycle->delete();

        return response()->json(['message' => 'Motorcycle deleted successfully.']);
    }

    private function validateMotorcycle(Request $request): array
    {
        $validated = $request->validate([
            'brand' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'model' => ['required', 'string', 'max:100'],
            'engineNumber' => ['required', 'string', 'max:100'],
            'engineDisplacement' => ['required', 'numeric', 'gt:0'],
            'fuelType' => ['required', Rule::in(['Gasoline', 'Diesel', 'Electric'])],
            'plateNumber' => ['required', 'string', 'max:50'],
            'chassisNumber' => ['required', 'string', 'max:100'],
            'transmission' => ['required', Rule::in(['Manual', 'Automatic', 'Semi-Automatic'])],
            'fuelCapacity' => ['required', 'numeric', 'gt:0'],
            'color' => ['required', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'gt:0'],
            'motorcyclePicture' => ['required', 'string'],
            'mileage' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ], [
            'motorcyclePicture.required' => 'A motorcycle picture is required.',
        ]);

        return [
            'brand' => $validated['brand'],
            'year' => $validated['year'],
            'model' => $validated['model'],
            'engine_number' => $validated['engineNumber'],
            'engine_displacement' => $validated['engineDisplacement'],
            'fuel_type' => $validated['fuelType'],
            'plate_number' => $validated['plateNumber'],
            'chassis_number' => $validated['chassisNumber'],
            'transmission' => $validated['transmission'],
            'fuel_capacity' => $validated['fuelCapacity'],
            'color' => $validated['color'],
            'price' => $validated['price'],
            'motorcycle_picture' => $validated['motorcyclePicture'],
            'mileage' => $validated['mileage'],
            'description' => $validated['description'] ?? '',
        ];
    }

    private function storePicture(?string $picture): string
    {
        if (!$picture || !preg_match('/^data:image\/jpeg;base64,(.+)$/', $picture, $matches)) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'motorcyclePicture' => 'The motorcycle picture must be a JPG or JPEG image.',
            ]);
        }

        $binary = base64_decode(str_replace(' ', '+', $matches[1]), true);

        if ($binary === false || strlen($binary) > 2 * 1024 * 1024) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'motorcyclePicture' => 'The motorcycle picture must be 2 MB or smaller.',
            ]);
        }

        if (@getimagesizefromstring($binary) === false) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'motorcyclePicture' => 'The uploaded picture is not a valid JPEG image.',
            ]);
        }

        $path = 'motorcycles/' . Str::uuid() . '.jpg';
        Storage::disk('public')->put($path, $binary);

        return $path;
    }

    private function deletePicture(?string $path): void
    {
        if ($path && str_starts_with($path, 'motorcycles/')) {
            Storage::disk('public')->delete($path);
        }
    }

    private function transform(Motorcycle $motorcycle): array
    {
        return [
            'id' => $motorcycle->id,
            'brand' => $motorcycle->brand,
            'year' => (int) $motorcycle->year,
            'model' => $motorcycle->model,
            'engineNumber' => $motorcycle->engine_number,
            'engineDisplacement' => (int) $motorcycle->engine_displacement,
            'fuelType' => $motorcycle->fuel_type,
            'plateNumber' => $motorcycle->plate_number,
            'chassisNumber' => $motorcycle->chassis_number,
            'transmission' => $motorcycle->transmission,
            'fuelCapacity' => (float) $motorcycle->fuel_capacity,
            'color' => $motorcycle->color,
            'price' => (float) $motorcycle->price,
            'motorcyclePicture' => $motorcycle->motorcycle_picture
                ? asset('storage/' . $motorcycle->motorcycle_picture)
                : '',
            'mileage' => (int) $motorcycle->mileage,
            'description' => $motorcycle->description ?? '',
            'createdAt' => $motorcycle->created_at?->toISOString(),
            'updatedAt' => $motorcycle->updated_at?->toISOString(),
        ];
    }
}
