import { AddReviewPayload } from '@/interfaces/Review';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react'; // make sure this is installed

interface ReviewFormProps {
  isLoading: boolean,
  pointId: number;
  appointmentId: number;
  onSubmit: (data: AddReviewPayload) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({isLoading, pointId, appointmentId, onSubmit }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ appointmentId, pointId, rating, comment });
  };

  return (
    <Card className="w-full max-w-md p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">
        <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={60}
                  className="cursor-pointer transition-colors"
                  color={(hoverRating ?? rating) > i ? 'orange' : 'gray'}
                  fill={(hoverRating ?? rating) > i ? 'orange' : 'gray'}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-1">
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full" disabled = {rating === 0 || !comment}>
            {isLoading ? 'Submitting...': 'Submit' }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
