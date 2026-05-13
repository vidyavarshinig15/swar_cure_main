import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Music,
  Search,
  Waveform,
  Headphones,
  Play,
  Pause,
  Heart,
  HeartOff,
  ListMusic,
  Loader2,
  Plus,
  Clock,
  Filter,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { MusicTrack, Playlist, musicApi } from '@/lib/api';
import MusicPlayer from '@/components/MusicPlayer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MusicExplorer() {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [frequencyRange, setFrequencyRange] = useState([0, 1000]);
  
  const { toast } = useToast();
  
  useEffect(() => {
    loadMusicData();
  }, []);
  
  const loadMusicData = async () => {
    try {
      setLoading(true);
      
      // Load all tracks
      const allTracks = await musicApi.getAllMusicTracks();
      setTracks(allTracks);

      // Load playlists
      const playlistsData = await musicApi.getPlaylists();
      setPlaylists(playlistsData);
      
      // Set a default playlist
      if (playlistsData.length > 0) {
        setSelectedPlaylist(playlistsData[0]);
      }
    } catch (error) {
      console.error('Error loading music data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load music data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePlayTrack = (track: MusicTrack) => {
    setCurrentTrack(track);
  };
  
  const handlePlaylistSelect = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      setSelectedPlaylist(playlist);
    }
  };
  
  const handleTrackEnd = () => {
    // Auto-play next track if available
    if (selectedPlaylist && currentTrack) {
      const currentIndex = selectedPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
      if (currentIndex >= 0 && currentIndex < selectedPlaylist.tracks.length - 1) {
        setCurrentTrack(selectedPlaylist.tracks[currentIndex + 1]);
      }
    }
  };
  

  
  const filterTracks = () => {
    let tracksToFilter = searchQuery.trim() ? tracks : (selectedPlaylist?.tracks || []);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tracksToFilter = tracksToFilter.filter(track => 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query) ||
        track.benefits.some(b => b.toLowerCase().includes(query)) ||
        track.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      tracksToFilter = tracksToFilter.filter(track => track.category === filterCategory);
    }
    
    // Apply frequency filter if tracks have frequency data
    tracksToFilter = tracksToFilter.filter(track => 
      !track.frequency || 
      (track.frequency >= frequencyRange[0] && track.frequency <= frequencyRange[1])
    );
    
    return tracksToFilter;
  };
  
  const displayedTracks = filterTracks();

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Sound Therapy Explorer</h1>
            <p className="text-muted-foreground mt-1">
              Discover healing sounds, frequencies, and traditional ragas for your wellbeing
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <ListMusic className="h-5 w-5 mr-2 text-primary" />
                  Collections
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="space-y-1">
                  {loading ? (
                    <>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-9 bg-slate-200 rounded animate-pulse mb-2"></div>
                      ))}
                    </>
                  ) : (
                    <>
                      {playlists.map((playlist) => (
                        <Button
                          key={playlist.id}
                          variant={selectedPlaylist?.id === playlist.id ? 'default' : 'ghost'}
                          className="w-full justify-start font-normal"
                          onClick={() => handlePlaylistSelect(playlist.id)}
                        >
                          <Music className="mr-2 h-4 w-4" />
                          {playlist.name}
                        </Button>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
              
              <Separator className="my-2" />
              
              <CardHeader className="pb-3 pt-2">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  Filters
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={filterCategory} 
                    onValueChange={setFilterCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="raga">Ragas</SelectItem>
                      <SelectItem value="frequency">Frequency</SelectItem>
                      <SelectItem value="nature">Nature Sounds</SelectItem>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="therapy">Therapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {showFilters ? 'Hide Advanced Filters' : 'Advanced Filters'}
                </Button>
                
                {showFilters && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Frequency Range (Hz)</Label>
                        <span className="text-xs text-muted-foreground">
                          {frequencyRange[0]} - {frequencyRange[1]} Hz
                        </span>
                      </div>
                      <Slider
                        value={frequencyRange}
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={setFrequencyRange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="spotify" />
                        <Label htmlFor="spotify">Spotify Tracks Only</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="favorites" />
                        <Label htmlFor="favorites">Favorites Only</Label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Therapy Benefits */}
            <Card className="border-accent/20 mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  Benefits
                </CardTitle>
                <CardDescription>
                  How sound therapy helps you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Stress Reduction</h4>
                  <p className="text-muted-foreground">
                    Sound frequencies can help activate the parasympathetic nervous system, reducing stress hormones.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Sleep Improvement</h4>
                  <p className="text-muted-foreground">
                    Specific ragas and frequencies promote deeper sleep cycles and help with insomnia.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Pain Management</h4>
                  <p className="text-muted-foreground">
                    Therapeutic sounds can help manage chronic pain by affecting pain perception pathways.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by title, artist, or benefit..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Current playlist info */}
              {selectedPlaylist && (
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedPlaylist.name}</h2>
                  <Badge variant="outline" className="text-xs">
                    {displayedTracks.length} tracks
                  </Badge>
                </div>
              )}
              <p className="text-muted-foreground text-sm mt-1">
                {selectedPlaylist?.description}
              </p>
            </div>
            
            {/* Music Player */}
            <div className="mb-6">
              <MusicPlayer track={currentTrack || undefined} onTrackEnd={handleTrackEnd} />
            </div>
            
            {/* Tracks */}
            <Card className="border-accent/20">
              <CardHeader className="pb-4">
                <CardTitle>Tracks</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-6">
                    <div className="flex justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  </div>
                ) : displayedTracks.length === 0 ? (
                  <div className="p-6 text-center">
                    <Music className="h-10 w-10 text-muted-foreground/60 mx-auto mb-2" />
                    <h3 className="font-medium">No tracks found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {displayedTracks.map((track) => (
                      <div 
                        key={track.id} 
                        className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                          currentTrack?.id === track.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                        }`}
                        onClick={() => handlePlayTrack(track)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded bg-muted relative overflow-hidden flex-shrink-0">
                            <img 
                              src={track.coverImage} 
                              alt={track.title}
                              className="object-cover w-full h-full"
                            />
                            
                            {currentTrack?.id === track.id && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Waveform className="h-6 w-6 text-white animate-pulse" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{track.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                            
                            <div className="flex items-center gap-2 mt-1">
                              {track.frequency && (
                                <Badge variant="outline" className="text-primary bg-primary/5 border-primary/20 text-xs px-2 py-0">
                                  {track.frequency} Hz
                                </Badge>
                              )}
                              <Badge variant="secondary" className="text-xs px-2 py-0 capitalize">
                                {track.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayTrack(track);
                              }}
                            >
                              {currentTrack?.id === track.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            
                            <div className="text-xs text-muted-foreground">
                              {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
