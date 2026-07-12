import type {
  DashboardStats,
  Vehicle,
  Driver,
  ReportItem,
} from '@/types/schema'

export const mockDashboardStats: DashboardStats = {
  activeVehicles: 36,
  availableVehicles: 6,
  vehiclesInMaintenance: 4,
  activeTrips: 28,
  driversOnDuty: 32,
  fleetUtilization: 82,
  vehicleStatusChart: {
    active: 36,
    available: 6,
    maintenance: 4,
    offline: 2,
  },
  tripStatusChart: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    completed: [42, 45, 50, 48, 52, 38, 30],
    delayed: [3, 2, 4, 1, 3, 5, 2],
  },
  recentTrips: [
    {
      id: 'TR-1029',
      vehicle: 'MH-12-QX-4029',
      driver: 'Rohan Sharma',
      startLocation: 'Terminal A, Pune',
      endLocation: 'East Hub, Mumbai',
      status: 'In Transit',
      departure: '09:12 AM',
    },
    {
      id: 'TR-1028',
      vehicle: 'MH-14-EU-8812',
      driver: 'Amit Patel',
      startLocation: 'South Hub, Pune',
      endLocation: 'Logistics City, Thane',
      status: 'Completed',
      departure: '07:30 AM',
    },
    {
      id: 'TR-1027',
      vehicle: 'MH-14-GP-5511',
      driver: 'Suresh Kumar',
      startLocation: 'Airport Cargo, Mumbai',
      endLocation: 'Terminal B, Pune',
      status: 'Delayed',
      departure: '06:45 AM',
    },
    {
      id: 'TR-1026',
      vehicle: 'MH-12-YT-2345',
      driver: 'Karan Malhotra',
      startLocation: 'Hinjewadi Phase 3',
      endLocation: 'Kothrud Depot',
      status: 'Completed',
      departure: '05:15 AM',
    },
  ],
}

export const mockVehicles: Vehicle[] = [
  { id: '1', plateNumber: 'MH-12-QX-4029', model: 'Volvo 9400 B11R', type: 'Electric Bus', capacity: 45, status: 'active', driver: 'Rohan Sharma', battery: '92%' },
  { id: '2', plateNumber: 'MH-14-EU-8812', model: 'TATA Ultra T.7', type: 'Electric Truck', capacity: 12, status: 'active', driver: 'Amit Patel', battery: '81%' },
  { id: '3', plateNumber: 'MH-12-TR-9081', model: 'BYD K9', type: 'Electric Bus', capacity: 40, status: 'maintenance', driver: 'N/A', battery: '14%' },
  { id: '4', plateNumber: 'MH-12-YT-2345', model: 'Eicher Pro 2049', type: 'Electric Light Truck', capacity: 8, status: 'offline', driver: 'Karan Malhotra', battery: '0%' },
  { id: '5', plateNumber: 'MH-14-GP-5511', model: 'Volvo Electric Bus', type: 'Electric Bus', capacity: 42, status: 'active', driver: 'Suresh Kumar', battery: '76%' },
  { id: '6', plateNumber: 'MH-12-XF-1122', model: 'TATA Starbus Ev', type: 'Electric Bus', capacity: 38, status: 'available', driver: 'Unassigned', battery: '88%' },
  { id: '7', plateNumber: 'MH-14-LK-3344', model: 'Mahindra Treo', type: 'Electric Light Truck', capacity: 6, status: 'active', driver: 'Rajesh More', battery: '95%' },
  { id: '8', plateNumber: 'MH-12-PP-5566', model: 'Ashok Leyland Circuit', type: 'Electric Bus', capacity: 44, status: 'maintenance', driver: 'N/A', battery: '10%' },
  { id: '9', plateNumber: 'MH-14-JJ-7788', model: 'BYD T8', type: 'Electric Truck', capacity: 15, status: 'active', driver: 'Nilesh Patil', battery: '68%' },
  { id: '10', plateNumber: 'MH-12-OO-9900', model: 'Proterra ZX5', type: 'Electric Bus', capacity: 46, status: 'available', driver: 'Unassigned', battery: '100%' },
  { id: '11', plateNumber: 'MH-14-QQ-1122', model: 'Rivian EDV', type: 'Electric Light Truck', capacity: 5, status: 'active', driver: 'Ajay Devgan', battery: '70%' },
  { id: '12', plateNumber: 'MH-12-ZZ-3344', model: 'Tesla Semi', type: 'Electric Truck', capacity: 20, status: 'active', driver: 'Akshay Kumar', battery: '85%' },
]

export const mockDrivers: Driver[] = [
  { id: '1', name: 'Rohan Sharma', licenseNumber: 'DL-142019008272', licenseExpiry: '2027-06-15', status: 'active', vehicleAssigned: 'MH-12-QX-4029', rating: 4.9, phoneNumber: '+91 98765 43210' },
  { id: '2', name: 'Amit Patel', licenseNumber: 'DL-122018991201', licenseExpiry: '2026-11-20', status: 'active', vehicleAssigned: 'MH-14-EU-8812', rating: 4.8, phoneNumber: '+91 98765 43211' },
  { id: '3', name: 'Suresh Kumar', licenseNumber: 'DL-092020229873', licenseExpiry: '2028-03-10', status: 'active', vehicleAssigned: 'MH-14-GP-5511', rating: 4.7, phoneNumber: '+91 98765 43212' },
  { id: '4', name: 'Karan Malhotra', licenseNumber: 'DL-202015091811', licenseExpiry: '2026-09-05', status: 'on_break', vehicleAssigned: 'MH-12-YT-2345', rating: 4.5, phoneNumber: '+91 98765 43213' },
  { id: '5', name: 'Vikram Singh', licenseNumber: 'DL-032014022131', licenseExpiry: '2025-12-01', status: 'inactive', vehicleAssigned: 'N/A', rating: 4.2, phoneNumber: '+91 98765 43214' },
  { id: '6', name: 'Rajesh More', licenseNumber: 'DL-122019992345', licenseExpiry: '2027-01-18', status: 'active', vehicleAssigned: 'MH-14-LK-3344', rating: 4.6, phoneNumber: '+91 98765 43215' },
  { id: '7', name: 'Nilesh Patil', licenseNumber: 'DL-142018903344', licenseExpiry: '2028-07-22', status: 'active', vehicleAssigned: 'MH-14-JJ-7788', rating: 4.8, phoneNumber: '+91 98765 43216' },
  { id: '8', name: 'Sunil Shinde', licenseNumber: 'DL-092021114455', licenseExpiry: '2026-04-30', status: 'inactive', vehicleAssigned: 'N/A', rating: 4.3, phoneNumber: '+91 98765 43217' },
  { id: '9', name: 'Ajay Devgan', licenseNumber: 'DL-202017008899', licenseExpiry: '2027-10-12', status: 'active', vehicleAssigned: 'MH-14-QQ-1122', rating: 4.9, phoneNumber: '+91 98765 43218' },
  { id: '10', name: 'Akshay Kumar', licenseNumber: 'DL-032015998811', licenseExpiry: '2028-02-28', status: 'active', vehicleAssigned: 'MH-12-ZZ-3344', rating: 4.7, phoneNumber: '+91 98765 43219' },
]

export const mockReports: ReportItem[] = [
  { id: 'REP-001', name: 'Monthly Vehicle Utilization Report', category: 'vehicle', createdDate: '2026-07-01', size: '2.4 MB', status: 'ready' },
  { id: 'REP-002', name: 'Weekly Trip Performance Summary', category: 'trip', createdDate: '2026-06-30', size: '4.1 MB', status: 'ready' },
  { id: 'REP-003', name: 'Fleet Fuel & Energy Consumption Report', category: 'fuel', createdDate: '2026-06-28', size: '1.8 MB', status: 'ready' },
  { id: 'REP-004', name: 'Daily Vehicle Status Audit', category: 'vehicle', createdDate: '2026-07-11', size: '840 KB', status: 'ready' },
  { id: 'REP-005', name: 'Quarterly Trip Route Analysis', category: 'trip', createdDate: '2026-05-15', size: '12.4 MB', status: 'ready' },
  { id: 'REP-006', name: 'EV Charging & Fuel Cost Report', category: 'fuel', createdDate: '2026-04-10', size: '3.2 MB', status: 'ready' },
  { id: 'REP-007', name: 'Vehicle Maintenance History Log', category: 'vehicle', createdDate: '2026-07-08', size: '1.5 MB', status: 'failed' },
  { id: 'REP-008', name: 'Live Trip Tracking Export', category: 'trip', createdDate: '2026-07-12', size: '950 KB', status: 'generating' },
  { id: 'REP-009', name: 'Fuel Efficiency Benchmark Report', category: 'fuel', createdDate: '2026-07-02', size: '1.2 MB', status: 'ready' },
  { id: 'REP-010', name: 'Vehicle Registration Compliance Report', category: 'vehicle', createdDate: '2026-07-09', size: '610 KB', status: 'ready' },
]
