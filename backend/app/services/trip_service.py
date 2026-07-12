class TripService:

    @staticmethod
    def get_all_trips():
        return [
            {
                "id": 1,
                "vehicle_id": 101,
                "driver_id": 201,
                "source": "Warehouse A",
                "destination": "Store B",
                "cargo_weight": 500,
                "status": "Scheduled"
            }
        ]