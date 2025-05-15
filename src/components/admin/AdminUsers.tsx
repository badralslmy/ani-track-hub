
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, User } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock users data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2023-02-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Active", joinDate: "2023-03-10" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "User", status: "Inactive", joinDate: "2023-04-05" },
    { id: 5, name: "David Brown", email: "david@example.com", role: "Moderator", status: "Active", joinDate: "2023-05-12" },
    { id: 6, name: "Emily Davis", email: "emily@example.com", role: "User", status: "Active", joinDate: "2023-06-18" },
    { id: 7, name: "Alex Wilson", email: "alex@example.com", role: "User", status: "Inactive", joinDate: "2023-07-23" },
  ];
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Join Date</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    user.role === "Admin" 
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" 
                      : user.role === "Moderator"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    user.status === "Active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
