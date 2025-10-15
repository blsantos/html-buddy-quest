import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Trophy, Clock, Mail, Calendar } from "lucide-react";

interface QuizResult {
  id: string;
  user_email: string;
  score: number;
  total_questions: number;
  percentage: number;
  total_time: number;
  answers: Record<number, string>;
  created_at: string;
}

export default function AdminDashboard() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadResults();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roleData) {
      toast.error("Accès refusé");
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const loadResults = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedResults = (data || []).map(result => ({
        ...result,
        answers: result.answers as Record<number, string>
      }));
      
      setResults(formattedResults);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors du chargement des résultats");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
    toast.success("Déconnexion réussie");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}min ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">
                  Tableau de Bord Admin
                </CardTitle>
                <CardDescription>
                  Résultats des Bâtisseurs du Digital
                </CardDescription>
              </div>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques Globales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total de tests</p>
                <p className="text-2xl font-bold">{results.length}</p>
              </div>
              <div className="bg-secondary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Score moyen</p>
                <p className="text-2xl font-bold">
                  {results.length > 0
                    ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)
                    : 0}%
                </p>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Temps moyen</p>
                <p className="text-2xl font-bold">
                  {results.length > 0
                    ? formatTime(Math.round(results.reduce((acc, r) => acc + r.total_time, 0) / results.length))
                    : "0min 0s"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tous les Résultats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Mail className="h-4 w-4 inline mr-2" />
                      Stagiaire
                    </TableHead>
                    <TableHead>
                      <Trophy className="h-4 w-4 inline mr-2" />
                      Score
                    </TableHead>
                    <TableHead>
                      <Clock className="h-4 w-4 inline mr-2" />
                      Temps
                    </TableHead>
                    <TableHead>
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.user_email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{result.score}/{result.total_questions}</span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            result.percentage >= 80 ? 'bg-success/20 text-success' :
                            result.percentage >= 60 ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {result.percentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatTime(result.total_time)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(result.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {results.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        Aucun résultat pour le moment
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
