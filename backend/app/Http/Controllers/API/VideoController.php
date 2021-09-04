<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Alaouy\Youtube\Facades\Youtube;

class VideoController extends Controller
{
    const MSG_SERVICE_ERROR = 'Couldn\'t get data from service. Check you request and try again.';
    const MSG_INPUT_ERROR = 'No input query defined.';

    const RESULTS_PER_PAGE = 10;
    const REGION_CODE = 'us';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function searchVideos()
    {
        if (request('q')) {
            $pageToken = request('pageToken');
            $params = [
                'q'             => request('q'),
                'type'          => 'video',
                'part'          => 'snippet',
                'maxResults'    => self::RESULTS_PER_PAGE
            ];
            try {
                $search = Youtube::paginateResults($params, $pageToken);
                return response()->json($this->_formatResponse($search));
            } catch (\Exception $e) {
                return response()->json(['error' => self::MSG_SERVICE_ERROR, 'details' => $e->getMessage()], 400);
            }
        } else {
            return response()->json(['error' => self::MSG_INPUT_ERROR], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getChannelVideos($channelId)
    {
        $pageToken = request('pageToken');
        $params = [
            'type'          => 'video',
            'chart'         => 'mostPopular',
            'part'          => 'snippet',
            'maxResults'    => self::RESULTS_PER_PAGE,
            'regionCode'    => self::REGION_CODE,
            'videoCategoryId' => $channelId
        ];

        try {
            if ($channelId) {
                $videos = Youtube::paginateResults($params, $pageToken);
            } else {
                $videos = Youtube::getPopularVideos(self::REGION_CODE);
            }
            return response()->json($this->_formatResponse($videos));
        } catch (\Exception $e) {
            return response()->json(['error' => self::MSG_SERVICE_ERROR, 'details' => $e->getMessage()], 400);
        }
    }

    /**
     * Get video categories from youtube.
     * 
     * @return \Illuminate\Http\Response
     */
    public function getCategories()
    {
        try {
            $categories = Youtube::getCategories(self::REGION_CODE);
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => self::MSG_SERVICE_ERROR, 'details' => $e->getMessage()], 400);
        }
    }

    /**
     * Format to be the same as mock data used.
     * 
     * @param  array  $data
     * @return array
     */
    private function _formatResponse($data)
    {
        if (isset($data['info'])) {
            $data['prevPageToken'] =  $data['info']['prevPageToken'];
            $data['nextPageToken'] =  $data['info']['nextPageToken'];
            unset($data['info']);
        }
        if (isset($data['results'])) {
            $data['items'] = is_array($data['results']) ? $data['results'] :  [];
            unset($data['results']);
        } else {
            $data['items'] =  $data;
        }
        
        return $data;
    }
}
