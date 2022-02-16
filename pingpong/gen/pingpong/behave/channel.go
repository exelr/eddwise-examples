// Code generated by eddwise, DO NOT EDIT.

package pingpongbehave

import (
	"testing"

	"pingpong/gen/pingpong"

	"github.com/exelr/eddwise"
	"github.com/exelr/eddwise/mock"
)

type PingpongBehave struct {
	*mock.ChannelBehave
}

func NewPingpongBehave(t *testing.T) *PingpongBehave {
	return &PingpongBehave{
		ChannelBehave: mock.NewBehaveChannel(t),
	}
}

func (cb *PingpongBehave) Recv() pingpong.PingpongRecv {
	return cb.ChannelBehave.Recv().(pingpong.PingpongRecv)
}

func (cb *PingpongBehave) OnPong(clientId uint64, evt *pingpong.Pong, f ...func()) {
	cb.On(clientId,
		func(ctx eddwise.Context) error {
			return cb.Recv().OnPong(ctx, evt)
		}, evt, f...)
}
