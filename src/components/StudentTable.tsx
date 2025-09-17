import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ArrowUpDown } from "lucide-react";
import { studentData, clusterStudents, type Student } from "../data/studentData";

type SortField = keyof Student;
type SortDirection = 'asc' | 'desc';

export const StudentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("assessment_score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const clusteredStudents = useMemo(() => clusterStudents(studentData), []);

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = clusteredStudents.filter(({ student }) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort(({ student: a }, { student: b }) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection, clusteredStudents]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getPersonaBadgeColor = (persona: string) => {
    const colors: Record<string, string> = {
      'High Achiever': 'bg-emerald-100 text-emerald-800',
      'Efficient Learner': 'bg-blue-100 text-blue-800',
      'Engaged Learner': 'bg-purple-100 text-purple-800',
      'Steady Performer': 'bg-cyan-100 text-cyan-800',
      'Developing Learner': 'bg-orange-100 text-orange-800',
      'Needs Support': 'bg-red-100 text-red-800',
    };
    return colors[persona] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="chart-container">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Student Performance Table</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('student_id')}
                    className="h-auto p-0 font-semibold"
                  >
                    ID <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-semibold"
                  >
                    Name <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('class')}
                    className="h-auto p-0 font-semibold"
                  >
                    Class <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('assessment_score')}
                    className="h-auto p-0 font-semibold"
                  >
                    Score <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('comprehension')}
                    className="h-auto p-0 font-semibold"
                  >
                    Comprehension <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('attention')}
                    className="h-auto p-0 font-semibold"
                  >
                    Attention <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('engagement_time')}
                    className="h-auto p-0 font-semibold"
                  >
                    Engagement <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Learning Persona</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedStudents.map(({ student, persona }) => (
                <TableRow key={student.student_id}>
                  <TableCell className="font-mono text-sm">{student.student_id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${
                      student.assessment_score >= 80 ? 'text-emerald-600' :
                      student.assessment_score >= 60 ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {student.assessment_score}%
                    </span>
                  </TableCell>
                  <TableCell>{student.comprehension.toFixed(1)}</TableCell>
                  <TableCell>{student.attention.toFixed(1)}</TableCell>
                  <TableCell>{student.engagement_time.toFixed(0)}min</TableCell>
                  <TableCell>
                    <Badge className={getPersonaBadgeColor(persona)}>
                      {persona}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedStudents.length} of {studentData.length} students
          </div>
        </div>
      </CardContent>
    </Card>
  );
};